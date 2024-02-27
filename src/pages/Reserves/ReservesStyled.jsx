import styled from "styled-components";

export const CourtName = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-top: 0;
  color: ${(props) => props.color || "black"};
`;
