/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import { HomeBody } from "../Home/HomeStyled";
import { Card } from "../../components/Card/Card";
import { findReserveByCourtId } from "../../services/reserveServices";
import { useEffect, useState } from "react";
import { findCourtById } from "../../services/courtService";
import { CourtName } from "./ReservesStyled";
import { getColor } from "../../components/CourtCard/CourtCard";
import { Button } from "../../components/Button/Button";

export default function Reserves() {
  const { idCourt } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [reserve, setReserve] = useState([]);
  const [court, setCourt] = useState({});

  async function getReservesByCourtId() {
    const reserve = await findReserveByCourtId(idCourt);
    setReserve(reserve.data.reservesByCourt);
  }

  async function getCourt() {
    const court = await findCourtById(idCourt);
    setCourt(court.data);
  }

  useEffect(() => {
    getReservesByCourtId();
    getCourt();
  }, []);

  return (
    <HomeBody>
      <Link to={"/quadra"}>
        <Button text={"Quadras"} />
      </Link>
      <CourtName color={getColor(court.name)}>{court.name}</CourtName>

      {reserve.map((item, index) => (
        <Card
          key={item.id}
          name={item.client}
          date={item.reservedDate}
          id={item.id}
          reserve={true}
          isEven={index % 2 === 0}
          index={index}
        />
      ))}
    </HomeBody>
  );
}
