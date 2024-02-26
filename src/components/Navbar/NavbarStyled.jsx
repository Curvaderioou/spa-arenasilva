import styled from "styled-components";

export const Nav = styled.nav`
  width: 100%;
  padding: 30px 10px;
  box-shadow: 0 0 10px #c4c4c4;
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
