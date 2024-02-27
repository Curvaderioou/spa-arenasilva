/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { findCourtById } from "../../services/courtService";
import {
  CardStyled,
  Danger,
  MostraDelete,
  Options,
  Success,
  Warning,
} from "./CardStyled";
import { deleteReserve } from "../../services/reserveServices";
import { getColor } from "../CourtCard/CourtCard";

export function Card(props) {
  const [quadra, setQuadra] = useState();
  const [mostraDelete, setMostraDelete] = useState(false);

  function formatDateTime(date) {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1; // Os meses em JavaScript são indexados a partir de zero
    const hour = formattedDate.getHours();
    const minutes = formattedDate.getMinutes();

    // Adicionando zeros à esquerda para garantir que as partes da data tenham dois dígitos
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");

    return `${formattedDay}/${formattedMonth} - ${hour}:0${minutes}`;
  }

  function handleDeleteClicked() {
    setMostraDelete(!mostraDelete);
  }

  async function handleDeleteReserve() {
    await deleteReserve(props.id);
  }

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
  }, [props.court]);
  // 6BA6FF

  return (
    <>
      <CardStyled
        reserve={props.reserve}
        isEven={props.isEven}
        color={getColor(quadra)}
        animationDelay={`${props.index * 0.1}s`}
      >
        <h3>{props.name}</h3>
        <p>{formatDateTime(props.date)}</p>
        <span>{quadra}</span>
        <Options>
          <Danger onClick={handleDeleteClicked}>
            <i className="fa-solid fa-trash"></i>
          </Danger>
          <Warning>
            <i className="fa-solid fa-pencil"></i>
          </Warning>
          <Success>
            <i className="fa-solid fa-check"></i>
          </Success>
        </Options>
      </CardStyled>
      {mostraDelete ? (
        <MostraDelete>
          <h2>Deseja excluir a reserva de {props.name}?</h2>
          <h3>Essa ação não pode ser desfeita!</h3>
          <button onClick={handleDeleteReserve}>Excluir</button>
          <button onClick={handleDeleteClicked}>Voltar</button>
        </MostraDelete>
      ) : null}
    </>
  );
}
