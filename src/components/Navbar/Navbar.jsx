/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Navigate, Outlet } from "react-router-dom";
import { Container, Nav } from "./NavbarStyled";
import { Button } from "../Button/Button";
import { InputSearch } from "../InputSearch/InputSearch";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { userLogged } from "../../services/userServices";
import { UserContext } from "../../Context/UserContext";

export function Navbar() {
  const { user, setUser } = useContext(UserContext);

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
    if (Cookies.get("token")) findUserLogged();
  }, []);

  return (
    <>
      <Nav>
        <Container>
          <form>
            <InputSearch type="text" placeholder="Procurar" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </form>
          <Link to="/">
            <img src="/public/logo.png" alt="Arena Silva" id="logo" />
          </Link>
          {Cookies.get("token") == undefined ? (
            <Link to="/auth">
              <Button type="button" text="Entrar"></Button>
            </Link>
          ) : (
            <button onClick={signout}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          )}
        </Container>
      </Nav>
      <Outlet />
    </>
  );
}
