/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Container, InputNav, Nav, NavBtnContainer } from "./NavbarStyled";
import { Button } from "../Button/Button";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { userLogged } from "../../services/userServices";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema } from "../../schemas/searchSchema";

export function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [arquivado, setArquivado] = useState(false);
  const [quadra, setQuadra] = useState(false);
  const location = useLocation();

  function verifyArchive() {
    setArquivado(location.pathname === "/arquivados");
  }
  function verifyCourt() {
    setQuadra(location.pathname === "/quadra");
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchSchema),
  });
  const navigate = useNavigate();

  function onSearch(data) {
    const { client } = data;
    navigate(`/search/${client}`);
    reset();
  }

  async function findUserLogged() {
    try {
      const response = await userLogged();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function signout() {
    Cookies.remove("token");
    setUser(undefined);
    Navigate("/");
  }
  useEffect(() => {
    findUserLogged();
  }, []);
  useEffect(() => {
    // Verificar se a localização atual corresponde à rota "/arquivados"
    setArquivado(location.pathname === "/arquivados");
    setQuadra(location.pathname === "/quadra");
  }, [location]);

  return (
    <>
      <Nav>
        <Container>
          <form onSubmit={handleSubmit(onSearch)}>
            <InputNav className="input-search-space">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                {...register("client")}
                type="text"
                placeholder="Pesquise por nome"
              />
            </InputNav>
          </form>
          <Link to="/">
            <img src="/public/logo.png" alt="Arena Silva" id="logo" />
          </Link>
          {Cookies.get("token") == undefined || !user ? (
            <Link to="/auth">
              <Button type="button" text="Entrar"></Button>
            </Link>
          ) : (
            <button onClick={signout}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          )}
          <NavBtnContainer>
            <Link
              to={
                Cookies.get("token") == undefined || !user
                  ? "/auth"
                  : "/arquivados"
              }
              className={arquivado ? "arquivado" : ""}
              onClick={verifyArchive}
            >
              Arquivados <i className="fa-solid fa-box-archive"></i>
            </Link>
            <Link
              to={
                Cookies.get("token") == undefined || !user ? "/auth" : "/quadra"
              }
              className={quadra ? "arquivado" : ""}
              onClick={verifyCourt}
            >
              Quadras
            </Link>
          </NavBtnContainer>
        </Container>
      </Nav>
      <Outlet />
    </>
  );
}
