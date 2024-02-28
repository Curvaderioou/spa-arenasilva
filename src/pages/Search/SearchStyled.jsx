import styled from "styled-components";

export const ContainerResults = styled.section`
  padding-top: 1rem;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
  }
`;

export const SearchReserves = styled.div`
  display: grid;
  gap: 45px;
  margin: 1rem auto;
  width: 90%;
`;

export const TextResults = styled.div`
  padding: 2rem;
  margin: 0 0 2rem;
  background-color: var(--light);
  width: 80%;
  border-radius: 0.3rem;
  box-shadow: 0px 0px 5px #c4c4c4;
  span {
    font-size: 1rem;
  }
`;
