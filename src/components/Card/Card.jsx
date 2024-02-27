/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
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
export function Card(props) {
  const [quadra, setQuadra] = useState();
  const [mostraDelete, setMostraDelete] = useState(false);
  const [mostraUpdate, setMostraUpdate] = useState(false);
  const [reserve, setReserve] = useState({});

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

  function handleUpdateClicked() {
    setMostraUpdate(!mostraUpdate);
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
  }, [props.court, reserve]);
  // 6BA6FF

  return (
    <>
      <CardStyled
        reserve={props.reserve}
        isEven={props.isEven}
        color={getColor(quadra)}
        animationDelay={`${props.index * 0.1}s`}
      >
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
        <Options>
          <Danger onClick={handleDeleteClicked}>
            <i className="fa-solid fa-trash"></i>
          </Danger>
          <Warning onClick={handleUpdateClicked}>
            <i className="fa-solid fa-pencil"></i>
          </Warning>
          <Success>
            <i className="fa-solid fa-check"></i>
          </Success>
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
