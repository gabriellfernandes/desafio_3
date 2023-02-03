import Head from "next/head";
import { Inter } from "@next/font/google";
import Link from "next/link";
import { useContext, useState } from "react";
import { GeneralContext } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useContext(GeneralContext);

  return (
    <>
      <Head>
        <title>Agenda Online</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full items-center justify-around gap-20 h-[100vh] bg-[#119DA4]">
        <main className=" p-20 rounded-md  w-[35%] h-auto  flex items-center justify-center flex-col gap-5 bg-[#13505B]">
          <h2 className="text-white text-3xl font-bold">Digite sua conta</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin({ email, password });
            }}
          >
            <input
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Logar-se</button>
          </form>
        </main>
      </div>
    </>
  );
}
