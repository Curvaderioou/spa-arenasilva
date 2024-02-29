import styled from "styled-components";

export const AuthContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85%;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 500px;
  width: 100%;
  padding: 2rem;
  gap: 1rem;
  background-color: ${(props) =>
    props.type === "signin" ? "var(--gray)" : "white"};
  color: var(--dark);
`;
