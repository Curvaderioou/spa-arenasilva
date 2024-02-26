/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { HomeBody, HomeHeader } from "./HomeStyled.jsx";
import { getAllReserves } from "../../services/reserveServices.js";
import { Button } from "../../components/Button/Button.jsx";
import { Link } from "react-router-dom";

export default function Home() {
  const [reserve, setReserve] = useState([]);

  async function findReserve() {
    const reserveResponse = await getAllReserves();
    // console.log(reserveResponse.data.results);
    setReserve(reserveResponse.data.results);
  }

  useEffect(() => {
    findReserve();
  }, [reserve]);

  return (
    <>
      <HomeHeader>
        <Link to="/quadra">
          <Button text="Novo" />
        </Link>
      </HomeHeader>
      <HomeBody>
        {reserve.map((item) => (
          <Card
            key={item.id}
            name={item.client}
            date={item.reservedDate}
            court={item.court}
            id={item.id}
          />
        ))}
      </HomeBody>
    </>
  );
}
