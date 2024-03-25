/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { findCourtById } from "../../services/courtService";
import {
  CardStyled,
  Danger,
  MostraDelete,
  Options,
  Success,
  UpdateForm,
  Warning,
} from "./CardStyled";
import { deleteReserve, updateReserve } from "../../services/reserveServices";
import { getColor } from "../CourtCard/CourtCard";
import { createArchive } from "../../services/archives.service";

export function Card(props) {
  const [quadra, setQuadra] = useState();
  const [mostraDelete, setMostraDelete] = useState(false);
  const [mostraUpdate, setMostraUpdate] = useState(false);
  const [reserve, setReserve] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [past, setPast] = useState(false);
  const [present, setPresent] = useState(false);
  const [today, setToday] = useState(false);
  const cardRef = useRef();

  function formatDateTime(date) {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1;
    const hour = formattedDate.getHours();
    const minutes = formattedDate.getMinutes();
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");

    return `${formattedDay}/${formattedMonth} - ${hour}:0${minutes}`;
  }

  function handleDeleteClicked() {
    setMostraDelete(!mostraDelete);
    setIsModalOpen(!isModalOpen);
  }

  function handleUpdateClicked() {
    setMostraUpdate(!mostraUpdate);
    setIsModalOpen(!isModalOpen);
  }

  async function handleUpdate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const client = data["client"].trim();

    if (!client) {
      alert("Por favor, insira o nome do cliente.");
      return;
    }

    const response = await updateReserve(props.id, client);
    setReserve(response.reserveUpdated);
    handleUpdateClicked();
  }

  async function handleDeleteReserve() {
    await deleteReserve(props.id);
    setReserve(false);
    setMostraDelete(false);
    setIsModalOpen(false); // Fecha o modal após excluir a reserva
  }

  function checkDate() {
    const reservedDate = new Date(props.date);
    const currentDate = new Date();

    // Definindo a data e hora da reserva
    reservedDate.setSeconds(0); // Ignorando os segundos
    reservedDate.setMilliseconds(0); // Ignorando os milissegundos

    let isToday = false;
    let isPresent = false;
    let isPast = false;

    // Comparando as datas
    if (
      reservedDate.getFullYear() === currentDate.getFullYear() &&
      reservedDate.getMonth() === currentDate.getMonth() &&
      reservedDate.getDate() === currentDate.getDate()
    ) {
      isToday = true;

      // Comparando as horas apenas se a data for a mesma
      if (reservedDate.getHours() === currentDate.getHours()) {
        isPresent = true;
      }
    }

    // Verificando se a reserva está no passado
    if (reservedDate < currentDate) {
      isPast = true;
    }

    setToday(isToday);
    setPresent(isPresent);
    setPast(isPast);
  }

  async function handleArchiveReserve() {
    const reservedDate = new Date(props.date);
    try {
      await createArchive(props.name, reservedDate, props.court);
      handleDeleteReserve();
    } catch (e) {
      return e;
    }
  }

  useEffect(() => {
    // Atualizar o checkDate a cada hora
    const intervalId = setInterval(() => {
      checkDate();
    }, 10000); // 3600000 milissegundos = 1 hora

    // Limpar o intervalo quando o componente é desmontado
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    async function fetchCourt() {
      try {
        const court = await findCourtById(props.court);
        const quadra = court.data.name;
        setQuadra(quadra);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourt();
    checkDate();
  }, [props.court, reserve]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target) &&
        !isModalOpen
      ) {
        setMostraDelete(false);
        setMostraUpdate(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <>
      <CardStyled
        reserve={props.reserve}
        isEven={props.isEven}
        color={getColor(quadra)}
        animationDelay={`${props.index * 0.1}s`}
        ref={cardRef}
        reserveFalse={reserve}
        archived={props.archived}
        past={past}
        present={present}
        today={today}
      >
        {present && <i className="fa-regular fa-clock"></i>}
        {mostraUpdate ? (
          <UpdateForm onSubmit={handleUpdate}>
            <input
              type="text"
              defaultValue={reserve.client || props.name}
              name="client"
            />
            <Success type="submit">
              <i className="fa-solid fa-check"></i>
            </Success>
          </UpdateForm>
        ) : (
          <h3>{reserve.client || props.name}</h3>
        )}

        <p>{formatDateTime(props.date)}</p>
        <span>{quadra}</span>
        <Options archived={props.archived}>
          <Danger onClick={handleDeleteClicked}>
            <i className="fa-solid fa-trash"></i>
          </Danger>
          {!past && !present && (
            <Warning onClick={handleUpdateClicked}>
              <i className="fa-solid fa-pencil"></i>
            </Warning>
          )}
          {(past || present) && (
            <Success onClick={handleArchiveReserve}>
              <i className="fa-solid fa-check"></i>
            </Success>
          )}
        </Options>
      </CardStyled>
      {mostraDelete && (
        <MostraDelete>
          <h2>Deseja excluir a reserva de {props.name}?</h2>
          <h3>Essa ação não pode ser desfeita!</h3>
          <button onClick={handleDeleteReserve}>Excluir</button>
          <button onClick={handleDeleteClicked}>Voltar</button>
        </MostraDelete>
      )}
    </>
  );
}
