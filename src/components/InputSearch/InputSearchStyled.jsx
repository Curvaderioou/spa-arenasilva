import styled from "styled-components";

export const InputSearchStyled = styled.input`
  padding: 5px;
  padding-right: 25px;
  padding-left: 10px;
  outline: none;
  border: none;
  background-color: var(--gray);
  border-radius: 2px;
  box-shadow: 0 0 0 #383838;
  &:focus {
    box-shadow: 0 0 2px #383838;
  }
`;
