import jwt from "jsonwebtoken";
import Cors from "cors";
import client from "@/utils/databaseClient";

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

const Idparams = async (req, res) => {
  await runCorsMiddleware(req, res, cors);
  await TokenMiddleware(req, res);


  const params = req.query;

  if (params.id !== undefined) {
    if (req.method === "GET") {
      const contact = await client.contacts.findUnique({
        where: { id: params.id },
      });

      if (!contact) {
        return res.status(409).json("contact not found");
      }

      return res.json(contact);
    }

    if (req.method === "PATCH") {
        const { name, phone, email } = req.body;

        if (!params.id) {
          return res.status(400).json("must a id");
        }

        const findUser = await client.contacts.findUnique({
          where: { id: params.id },
        });

        if (!findUser) {
          return res.status(409).json("contact not found");
        }

        const updateUser = await client.contacts.update({
          where: { id: params.id },
          data: {
            name,
            phone,
            email,
          },
        });

        return res.json({
          message: "contact updated",
          contact: { ...updateUser, password: undefined },
        });
    }
  }
};

export default Idparams;
