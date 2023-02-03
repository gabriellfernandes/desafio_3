import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import Cors from "cors";
import client from "@/utils/databaseClient";

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

export default async function login(req, res) {
  await runCorsMiddleware(req, res, cors);

  const { email, password } = req.body;

  const findUser = await client.users.findUnique({
    where: { email },
  });

  const findContact = await client.contacts.findUnique({
    where: { email },
  });

  if (!findUser && !findContact) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!compareSync(password, findUser.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = jwt.sign(
    {
      name: findUser.name,
      email: findUser.email,
      phone: findUser.phone,
    },
    process.env.SECRET_KEY,
    { expiresIn: "72000h", subject: findUser.id }
  );

  return res
    .status(200)
    .json({ accessToken, user: { ...findUser, password: undefined } });
}
