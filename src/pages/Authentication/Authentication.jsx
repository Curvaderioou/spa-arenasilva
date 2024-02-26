/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { AuthContainer, Section } from "./AuthenticationStyled";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../../schemas/signinSchema";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import { signin } from "../../services/userServices";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function Authentication() {
  const {
    register: registerSignin,
    handleSubmit: handleSubmitSignin,
    formState: { errors: errorsSignin },
  } = useForm({ resolver: zodResolver(signinSchema) });

  async function inHandleSubmit(data) {
    try {
      const response = await signin(data);
      Cookies.set("token", response.data, { expires: 7 });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();

  return (
    <AuthContainer>
      <Section type="signin">
        <h2>Entrar</h2>
        <form onSubmit={handleSubmitSignin(inHandleSubmit)}>
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
            register={registerSignin}
          />
          {errorsSignin.email && (
            <ErrorSpan>{errorsSignin.email.message}</ErrorSpan>
          )}
          <Input
            type="password"
            placeholder="Senha"
            name="password"
            register={registerSignin}
          />
          {errorsSignin.password && (
            <ErrorSpan>{errorsSignin.password.message}</ErrorSpan>
          )}
          <Button type="submit" text="Entrar" />
        </form>
      </Section>
    </AuthContainer>
  );
}
