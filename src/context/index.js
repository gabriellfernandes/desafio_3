import { createContext, useEffect, useState } from "react";
import api from "../services";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
  const navigate = useRouter();
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [contect, setContect] = "";

  const getUser = () => {
    api
      .get("/users/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((user) => {
        setUser(user.data);
        navigate.push("/dashbord");
        return setLoading(false);
      })
      .catch((err) => {
        navigate.push("/");
      });
  };

  useEffect(() => {
    localStorage.getItem("token") == undefined && navigate.push("/");

    localStorage.getItem("token") != undefined &&
      setToken(localStorage.getItem("token"));

    localStorage.getItem("token") != undefined && getUser();
  }, [token, contect]);

  const handleLogin = (data) => {
    api
      .post("/auth/login", data)
      .then((res) => {
        toast.success("Logado com sucesso")
        localStorage.setItem("token", res.data.accessToken);
        setToken(res.data.accessToken);
      })
      .catch((err) => toast.error("Usuario ou senha incorreto"));
  };

  const handleRegister = (data) => {
    api
      .post("/users/register", data)
      .then((res) => {
        toast.success("Conta criada com sucesso")
        return navigate.push("/login");
      })
      .catch((err) => toast.error("Email ja utilizado"));
  };

  const handleDeleteContact = (id) => {
    api
      .delete(`contact/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Contato deletado com sucesso")
        getUser();
      })
      .catch((err) => {});
  };

  const handlePacthContact = (data, id, setOpen) => {
    api
      .patch(`contact/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Contato alterado com sucesso")
        getUser();
      })
      .catch((err) => {})
      .finally(() => setOpen(false));
  };

  const handlePacthUser = (data, setOpen) => {
    api
      .patch(`users/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Usuario alterado com sucesso")
        getUser();
      })
      .catch((err) => {})
      .finally(() => setOpen(false));
  };

  const handleDeleteUser = () => {
    api
      .delete(`/users/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Usuario deletado com sucesso")
        localStorage.removeItem("token");
        navigate.push("/")
      })
      .catch((err) => {});
  }

  const handleAddContact = (data, setOpen) => {
    api
    .post(`contact/register`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      toast.success("Contato Adicionado com sucesso")
      getUser();
    })
    .catch((err) => {})
    .finally(() => setOpen(false));
  }

  const handleExit = () => {
    toast.success("Deslogado com sucesso")
    localStorage.removeItem("token");
    navigate.push("/")
  }

  return (
    <GeneralContext.Provider
      value={{
        handleLogin,
        handleRegister,
        handlePacthContact,
        handleDeleteContact,
        handlePacthUser,
        handleDeleteUser,
        handleAddContact,
        handleExit,
        user,
        loading,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
