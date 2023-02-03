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

export default async function contact(req, res) {
  await runCorsMiddleware(req, res, cors);
  await TokenMiddleware(req, res);

  return res.status(400).json({
    menssagem: "Only get and pach routes and with id parameter"
  })
}