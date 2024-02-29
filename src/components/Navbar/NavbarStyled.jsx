import styled from "styled-components";

export const Nav = styled.nav`
  width: 100%;
  padding: 30px 10px 50px;
  position: relative;
  box-shadow: 0 0 10px #c4c4c4;
  overflow: hidden;
  #logo {
    max-width: 130px;
  }
  form {
    position: relative;
    display: flex;
    i {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translate(0, -50%);
      transition: all.3s;
      padding: 3px;
      font-size: 1rem;
      color: #a1a1a1;
    }
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  justify-items: center;
  align-items: center;
  margin: 0 auto;
  @media only screen and (min-width: 471px) and (max-width: 780px) {
    display: flex;
    justify-content: space-between;
    gap: 15px;
  }
  @media only screen and (max-width: 470px) {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
    form {
      grid-row: 3;
      margin-bottom: 20px;
    }
    #loginBtn {
      position: absolute;
      right: 10px;
      top: 40px;
    }
  }
`;

export const ErrorSpan = styled.span`
  background-color: #ffd7d7;
  color: #9e0000;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  font-size: 1rem;
  border-radius: 7px;
`;

export const InputNav = styled.div`
  position: relative;
  border-radius: 3px;
  border: 1px solid var(--gray);
  background-color: var(--gray);
  i {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translate(0, -50%);
    transition: all.3s;
    padding: 3px;
  }
  i:hover {
    color: var(--main);
    filter: drop-shadow(0px 0px 2px var(--main));
  }
  input {
    padding: 5px;
    border: none;
    border-radius: 2px;
    outline: none;
    background-color: var(--gray);
    border: 1px solid transparent;
    padding: 5px 10px;
    padding-right: 25px;
    &:focus {
      border: 1px solid var(--main);
    }
  }
`;

export const NavBtnContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  width: 100%;
  a {
    display: flex;
    font-size: 1.1rem;
    gap: 5px;
    align-items: center;
    background-color: #eee;
    padding: 4px 6px;
    border-radius: 3px 3px 0 0;
    box-shadow: 0 0 3px 1px #c4c4c4;
    transition: all.3s;
    i {
      color: var(--dark);
    }
  }
  .arquivado {
    background-color: var(--dark);
    color: var(--sec);
    i {
      color: var(--sec);
    }
  }
`;
