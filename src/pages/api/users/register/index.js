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
    const { name, email, phone, password } = req.body;

    const findUser = await client.users.findUnique({
      where: { email },
    });
  
    const findContact = await client.contacts.findUnique({
      where: { email },
    });

    if (findUser || findContact) {
      return res.status(409).json({ message: "email already exist" });
    }
    const hashedPassword = await hash(password.toString(), 10);

    const createUser = await client.users.create({
      data: {
        name,
        password: hashedPassword,
        phone,
        email,
      },
    });

    return res.json({
      message: "user created",
      user: { ...createUser, password: undefined},
    });
  }
}
