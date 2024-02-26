import styled from "styled-components";

export const ButtonStyled = styled.button`
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
`;
