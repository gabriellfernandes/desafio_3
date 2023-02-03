import client from "@/utils/databaseClient";
import Cors from "cors";
import { hash } from "bcryptjs";

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

export default async function register(req, res) {
  await runCorsMiddleware(req, res, cors);

  if (req.method === "POST") {
    const { name, email, phone, userId } = req.body;

    const findUser = await client.users.findUnique({
      where: { email },
    });
  
    const findContact = await client.contacts.findUnique({
      where: { email },
    });

    if (findUser || findContact) {
      return res.status(409).json({ message: "email already exist" });
    }

    const user = await client.users.findUnique({
      where: { id: userId },
    });

    if(!user){
      return res.status(409).json({ message: "user not found" });
    }

    const createUser = await client.contacts.create({
      data: {
        name,
        phone,
        email,
        userId
      },
    });

    return res.json({
      message: "contact created",
      user: { ...createUser, password: undefined},
    });
  }
}
