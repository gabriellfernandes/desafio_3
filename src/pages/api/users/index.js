import jwt from "jsonwebtoken";
import Cors from "cors";
import client from "@/utils/databaseClient";
import contact from "../contact";


async function TokenMiddleware(req, res, fn) {
    let token = req.headers.authorization;
  
    if (!token) {
      return res
        .status(400)
        .json("to access this route you need to send a token");
    }
  
    token = token.split(" ")[1];
  
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(401).json("Invalid Token");
      }
      req.user = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        phone: decoded.phone,
      };
      console.log(decoded);
    });
  }
  
const cors = Cors({
  methods: ["POST", "GET", "HEAD", "DELETE", "UPDATE"],
});

function runCorsMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function users(req, res) {
  await runCorsMiddleware(req, res, cors);
  await TokenMiddleware(req, res);

  const { id } = req.user;

  if (req.method === "GET") {
    const user = await client.users.findUnique({
      where: { id },
      include: {contacts: true}
    });

    if (!user) {
      return res.status(409).json("user not found");
    }

    return res.json(user);
  } else if(req.method === "PATCH"){
    const { id } = req.user;
    const { name, password, phone, email } = req.body;

    if (!id) {
      return res.status(400).json("must a id");
    }

    const findUser = await client.users.findUnique({
      where: { id },
    });

    if (!findUser) {
      return res.status(409).json("user not found");
    }

    let hashedPassword = undefined;

    if (password !== undefined) {
      hashedPassword = await hash(password.toString(), 10);
    }

    const updateUser = await client.users.update({
      where: { id },
      data: {
        name,
        password: hashedPassword,
        phone,
        email,
      },
    });

    return res.json({
      message: "user updated",
      user: {...updateUser, password: undefined},
    });
  }else{
    return res.status(400, { message: "only Get and Patch routes"})
  }
}