import { createContext, useEffect, useState } from "react";
import api from "../services";
import { useRouter } from "next/router";

export const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
    const navigate = useRouter()
  const [user, setUser] = useState({})
  
  const handleLogin = (data) => {
    api.post("/auth/login", data).then(res => {
        console.log(res.data.user)

        return setUser(res.data.user)
    }).catch(err => console.log(err.data))
  }

  const handleRegister = (data) => {
    api.post("/auth/login", data).then(res => {
        console.log(res.data.user)

        return setUser(res.data.user)
    }).catch(err => console.log(err.data))
  }

  return <GeneralContext.Provider value={{handleLogin, handleRegister}}>{children}</GeneralContext.Provider>;
};
