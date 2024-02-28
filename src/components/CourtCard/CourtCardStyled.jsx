import styled from "styled-components";

export const CourtCardStyled = styled.article`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--dark);
  padding: 30px;
  background-color: ${(props) => props.color};
  font-size: 1.4rem;
  font-weight: 700;
  position: relative;
  transition: all.3s;
  opacity: 0;
  transform: translate(0, 50%);
  animation: anima 0.5s forwards;
  &:hover {
    div {
      opacity: 1;
    }
    background-color: #eee;
    color: #eee;
  }
  p {
    position: absolute;
    left: 10px;
    top: 0px;
    font-weight: 400;
  }

  @keyframes anima {
    100% {
      transform: translate(0);
      opacity: 1;
    }
  }
`;

export const CourtButtons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all.3s;
  opacity: 0;
`;

export const Reservar = styled.form`
  display: grid;
  gap: 25px;
  padding: 40px 60px;
  border: 2px solid var(--dark);
  background-color: var(--light);
  z-index: 100;
  label {
    display: block;
    font-size: 1.4em;
  }
  input,
  textarea {
    padding: 5px;
    border-radius: 2px;
    border: none;
    border: 1px solid #000;
    color: #000;
    outline: none;
  }
  textarea {
    resize: none;
    height: 90px;
  }
  p {
    text-align: center;
    cursor: pointer;
  }
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  button {
    background-color: var(--main);
    border: 2px solid var(--dark);
    padding: 5px 20px;
    font-size: 1.1rem;
    border-radius: 2px;
    color: var(--dark);
    &:hover {
      background-color: var(--dark);
      color: var(--sec);
    }
  }
`;

export const Confirmation = styled.div`
  background-color: var(--light);
  padding: 40px 20px;
  border-radius: 3px;
  font-size: 1.5rem;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid var(--dark);
  color: green;
  z-index: 100;
`;
export const ErrorForm = styled.div`
  background-color: var(--light);
  padding: 40px 20px;
  border-radius: 3px;
  font-size: 1.5rem;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid var(--dark);
  color: red;
  z-index: 100;
`;
