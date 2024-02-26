/* eslint-disable react/prop-types */
import { InputSearchStyled } from "./InputSearchStyled";

export function InputSearch(props) {
  return (
    <InputSearchStyled
      type={props.type}
      placeholder={props.placeholder}
    ></InputSearchStyled>
  );
}
