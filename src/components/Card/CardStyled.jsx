import styled from "styled-components";

export const CardStyled = styled.article`
  display: ${(props) => (props.reserveFalse ? "grid" : "none")};
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  position: relative;
  gap: 30px;
  width: 100%;
  & > i {
    position: absolute;
    right: -30px;
  }
  background-color: ${(props) => {
    if (props.archived) {
      return "#3fa054"; // Retorna a cor verde se for arquivado
    } else if (props.past) {
      return "#bebebe"; // Retorna a cor cinza se for passado
    } else if (props.present) {
      return "var(--main)"; // Retorna a cor principal se for presente
    } else {
      return "transparent"; // Retorna uma cor transparente como padrão
    }
  }};

  color: ${(props) => (props.archived ? "var(--light)" : "var(--dark)")};
  border: 2px solid var(--dark);
  padding: 20px;
  border-radius: 10px;
  transform: translate(${(props) => (props.isEven ? "50%" : "-50%")});
  animation: cima 0.5s forwards;
  animation-delay: ${(props) => props.animationDelay};
  opacity: 0;
  h3 {
    margin-right: auto;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.3rem;
  }
  & > span {
    display: ${(props) => (props.reserve ? "none" : "inherit")};
    position: absolute;
    left: 10px;
    border-radius: 3px;
    top: 0px;
    transform: translateY(-100%);
    background-color: ${(props) => props.color};
    color: var(--dark);
    font-weight: 700;
    padding: 2px 6px;
    border: 2px solid var(--dark);
  }

  @keyframes cima {
    100% {
      transform: translate(0);
      opacity: 1;
    }
  }
`;

export const Options = styled.div`
  display: ${(props) => (props.archived ? "none" : "flex")};
  gap: 10px;
  margin-left: auto;
`;

export const Danger = styled.button`
  background-color: #ff4848;
  width: 30px;
  height: 30px;
  padding: 3px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Warning = styled.button`
  background-color: #fff021;
  width: 30px;
  height: 30px;
  padding: 3px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Success = styled.button`
  display: ${(props) => (props.present ? "block" : "none")};
  background-color: #4eff48;
  width: 30px;
  height: 30px;
  padding: 3px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MostraDelete = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--dark);
  background-color: #ff9a9a;
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.3rem;
    color: red;
  }
  button:nth-child(3) {
    background-color: red;
    padding: 4px 10px;
    border-radius: 2px;
    color: var(--light);
    margin: 10px 0;
  }
`;

export const UpdateForm = styled.form`
  display: flex;
  align-items: end;
  gap: 5px;
  input {
    border: none;
    outline: none;
    font-size: 1.5rem;
    box-shadow: 0 -2px 0 var(--dark) inset;
  }
`;
