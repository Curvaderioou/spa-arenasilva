import { ButtonStyled } from "./ButtonStyled";

/* eslint-disable react/prop-types */
export function Button(props) {
  return (
    <ButtonStyled type={props.type} onClick={props.onclick}>
      {props.text}
    </ButtonStyled>
  );
}
