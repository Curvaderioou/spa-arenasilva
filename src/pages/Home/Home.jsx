/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { FormCalendar, HomeBody, HomeHeader } from "./HomeStyled.jsx";
import {
  getAllReserves,
  getAllReservesOnDate,
  deleteReserve as deleteReserveService,
} from "../../services/reserveServices.js";
import { Button } from "../../components/Button/Button.jsx";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../../Context/UserContext.jsx";
import { userLogged } from "../../services/userServices.js";

export default function Home() {
  const { user, setUser } = useContext(UserContext);
  const [reserve, setReserve] = useState([]);
  const [emptyReserve, setEmptyReserve] = useState(false);
  const [calendar, setCalendar] = useState(false);

  async function findReserve() {
    const reserveResponse = await getAllReserves();
    if (
      reserveResponse.data.results &&
      reserveResponse.data.results.length === 0
    ) {
      setEmptyReserve(true);
    } else {
      setEmptyReserve(false);
    }
    setReserve(reserveResponse.data.results);
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

  async function handleFindReserve() {
    showCalendar();
    await findReserve(); // Carregar novamente as reservas ao clicar em "Mostrar Todos"
  }

  function showCalendar() {
    setCalendar(!calendar);
  }
  async function findUserLogged() {
    try {
      const response = await userLogged();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    findReserve();
    findUserLogged();

    // Atualizar as reservas a cada hora
    const intervalId = setInterval(() => {
      findReserve();
    }, 3600000); // 3600000 milissegundos = 1 hora

    // Limpar o intervalo quando o componente é desmontado
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <HomeHeader>
        <Link
          to={Cookies.get("token") === undefined || !user ? "/auth" : "/quadra"}
        >
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
          <h2 style={{ fontSize: "2rem", textAlign: "center" }}>
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
