import styled from "styled-components";

export const CardStyled = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  position: relative;
  gap: 30px;
  width: 100%;
  /* box-shadow: 0 0 4px 1px #d1d1d1; */
  background-color: var(--light);
  border: 2px solid var(--dark);
  padding: 20px;
  border-radius: 10px;
  h3 {
    margin-right: auto;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.3rem;
  }
  & > span {
    position: absolute;
    left: 10px;
    border-radius: 3px;
    top: 0px;
    transform: translateY(-100%);
    background-color: ${(props) => props.color};
    color: var(--dark);
    font-weight: 700;
    padding: 3px 6px;
    border: 2px solid var(--dark);
  }
`;

export const Options = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
`;

export const Danger = styled.button`
  background-color: #ff4848;
  width: 30px;
  height: 30px;
  padding: 3px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Warning = styled.button`
  background-color: #fff021;
  width: 30px;
  height: 30px;
  padding: 3px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Success = styled.button`
  background-color: #4eff48;
  width: 30px;
  height: 30px;
  padding: 3px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MostraDelete = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--dark);
  background-color: #ff9a9a;
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.3rem;
    color: red;
  }
  button:nth-child(3) {
    background-color: red;
    padding: 4px 10px;
    border-radius: 2px;
    color: var(--light);
    margin: 10px 0;
  }
`;
