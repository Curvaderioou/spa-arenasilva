import styled from "styled-components";

export const HomeHeader = styled.header`
  margin: 40px auto;
  width: 100%;
  max-width: 800px;
  position: relative;
  a {
    margin: 0 auto;
    max-width: fit-content;
  }
  #calendar-btn {
    position: absolute;
    right: 20px;
    top: 0;
  }
  #todos {
    position: absolute;
    top: 0;
    top: -20px;
  }
`;

export const HomeBody = styled.section`
  width: 100%;
  max-width: 800px;
  display: grid;
  gap: 45px;
  margin: 0 auto 40px;
  a {
    margin: 30px auto 0;
    max-width: fit-content;
  }
`;

export const FormCalendar = styled.form`
  position: absolute;
  z-index: 10;
  right: 40px;
  top: -4px;
  display: grid;
  justify-items: center;
  transform: translate(0, -70%);
  opacity: 0;
  gap: 5px;
  animation: aparece 0.5s forwards;
  button {
    background-color: var(--main);
    border: 2px solid var(--dark);
    max-width: fit-content;
    line-height: 1rem;
    padding: 4px 4px 2px;
  }

  input {
    border-radius: 2px;
    padding: 1px 3px;
    max-width: 130px;
  }

  @keyframes aparece {
    100% {
      transform: translate(0);
      opacity: 1;
    }
  }
`;
