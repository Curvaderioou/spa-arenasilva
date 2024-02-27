/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { FormCalendar, HomeBody, HomeHeader } from "./HomeStyled.jsx";
import {
  getAllReserves,
  getAllReservesOnDate,
} from "../../services/reserveServices.js";
import { Button } from "../../components/Button/Button.jsx";
import { Link } from "react-router-dom";

export default function Home() {
  const [reserve, setReserve] = useState([]);
  const [emptyReserve, setEmptyReserve] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [denovo, setDenovo] = useState(false);

  async function findReserve() {
    const reserveResponse = await getAllReserves();
    if (
      reserveResponse.data.results &&
      reserveResponse.data.results.length === 0
    ) {
      setEmptyReserve(true);
    }
    setReserve(reserveResponse.data.results);
  }

  function handleFindReserve() {
    showCalendar();
    setDenovo(!denovo);
  }

  async function handleCalendar(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const response = await getAllReservesOnDate(data["dia"]);
    const reservations = response.data.results;
    if (reservations.length === 0) {
      setEmptyReserve(true);
    } else {
      setEmptyReserve(false);
    }
    setReserve(reservations);
  }

  function showCalendar() {
    setCalendar(!calendar);
  }

  useEffect(() => {
    findReserve();
  }, [denovo]);

  return (
    <>
      <HomeHeader>
        <Link to="/quadra">
          <Button text="Novo" />
        </Link>
        {!calendar ? (
          <button id="calendar-btn" onClick={showCalendar}>
            <i className="fa-regular fa-calendar"></i>
          </button>
        ) : (
          <button
            style={{ opacity: 0.2 }}
            id="calendar-btn"
            onClick={showCalendar}
          >
            <i className="fa-regular fa-calendar"></i>
          </button>
        )}
        {calendar && (
          <>
            <FormCalendar onSubmit={handleCalendar}>
              <input type="date" name="dia" />
              <button type="submit">Ok</button>
            </FormCalendar>
            <button id="todos" onClick={handleFindReserve}>
              Mostrar Todos
            </button>
          </>
        )}
      </HomeHeader>
      <HomeBody>
        {emptyReserve ? (
          <h2 style={{ fontSize: 2 + "rem", textAlign: "center" }}>
            Não há Reservas
          </h2>
        ) : (
          reserve.map((item, index) => (
            <Card
              key={item.id}
              name={item.client}
              date={item.reservedDate}
              court={item.court}
              desc={item.description}
              id={item.id}
              isEven={index % 2 === 0}
              index={index}
            />
          ))
        )}
      </HomeBody>
    </>
  );
}
