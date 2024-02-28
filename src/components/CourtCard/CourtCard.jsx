/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import {
  Confirmation,
  CourtButtons,
  CourtCardStyled,
  ErrorForm,
  Reservar,
} from "./CourtCardStyled";
import {
  createReserve,
  findReserveByCourtId,
} from "../../services/reserveServices";
import { useNavigate } from "react-router-dom";

export function getColor(name) {
  switch (name) {
    case "Quadra 1":
      return "#4CD6F6";
    case "Quadra 2":
      return "#C14CF6";
    case "Quadra 3":
      return "#F66C4C";
    case "Quadra 4":
      return "#81F64C";
    case "Área 1":
      return "#DAC87F";
    case "Área 2":
      return "#7F91DA";
    default:
      return "#eee";
  }
}

export function CourtCard(props) {
  const [mostraForm, setMostraForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showError, setShowError] = useState(false);
  const [countReserves, setCountReserves] = useState([]);
  const [reservedTimes, setReservedTimes] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([]);

  const navigate = useNavigate();

  function mostra() {
    setMostraForm(!mostraForm);
  }

  function handleDateChange(event) {
    setSelectedDate(event.target.value);
    updateAvailableOptions();
  }

  async function getReservesByCourt() {
    try {
      const response = await findReserveByCourtId(props.id);
      const reservedTimes = response.data.reservesByCourt.map((reserve) => ({
        time: new Date(reserve.reservedDate).getHours() + ":00",
        court: reserve.court.name,
        date: new Date(reserve.reservedDate).toDateString(),
      }));
      setCountReserves(response.data.reservesByCourt.length);
      setReservedTimes(reservedTimes);
      updateAvailableOptions();
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
    }
  }

  function updateAvailableOptions() {
    if (!selectedDate) {
      return;
    }
    const dayOfWeek = new Date(selectedDate).getDay();

    let options = [];
    if (dayOfWeek === 5) {
      options = [
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
      ];
    } else if (dayOfWeek === 6) {
      options = ["13:00", "14:00", "15:00", "16:00"];
    } else {
      options = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
    }

    const minhaData = selectedDate;
    const dataNovo = minhaData.split("-");
    const anoNovo = parseInt(dataNovo[0], 10);
    const mesNovo = parseInt(dataNovo[1], 10);
    const diaNovo = parseInt(dataNovo[2], 10);
    const dataFinal = new Date(anoNovo, mesNovo - 1, diaNovo);

    const reservedTimesForSelectedDate = reservedTimes.filter(
      (reservedTime) =>
        reservedTime.court === props.name &&
        reservedTime.date === new Date(dataFinal).toDateString()
    );

    const availableOptions = options.filter((option) => {
      return !reservedTimesForSelectedDate.some(
        (reservedTime) => reservedTime.time === option
      );
    });
    setAvailableOptions(availableOptions);
  }

  function sendReserves() {
    navigate("/reservas/" + props.id);
  }

  async function handleForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const cliente = data["cliente"].trim(); // Remover espaços em branco do início e do fim
    const dia = data["data"];
    const hora = data["hora"];

    // Verificar se o campo cliente está vazio ou contém apenas espaços
    if (!cliente) {
      alert("Por favor, insira o nome do cliente.");
      return;
    }

    // Verificar se a data foi selecionada
    if (!dia) {
      alert("Por favor, selecione uma data.");
      return;
    }

    // Verificar se a hora foi selecionada
    if (!hora) {
      alert("Por favor, selecione um horário.");
      return;
    }

    const dataAtual = new Date();

    const partesDataFormulario = dia.split("-");
    const anoFormulario = parseInt(partesDataFormulario[0], 10);
    const mesFormulario = parseInt(partesDataFormulario[1], 10);
    const diaFormulario = parseInt(partesDataFormulario[2], 10);

    const partesHoraFormulario = hora.split(":");
    const horaFormulario = parseInt(partesHoraFormulario[0], 10);
    const minutoFormulario = parseInt(partesHoraFormulario[1], 10);

    const dataFormulario = new Date(
      anoFormulario,
      mesFormulario - 1,
      diaFormulario
    );
    dataFormulario.setHours(horaFormulario, minutoFormulario, 0, 0);

    if (dataFormulario < dataAtual) {
      alert("A máquina do tempo ainda não foi inventada.");
    } else {
      try {
        const response = await createReserve(
          cliente, // Usar o valor tratado do cliente
          dataFormulario,
          data["desc"],
          props.id
        );

        // Se o status da resposta for 201, mostra a mensagem de confirmação
        if (response.status === 201) {
          setShowConfirmation(true);
          setTimeout(() => {
            setShowConfirmation(false);
          }, 3000);

          // Após fazer a reserva com sucesso, atualize as reservas e as opções disponíveis
          getReservesByCourt();
        } else {
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 3000);
        }
      } catch (error) {
        console.error("Erro ao criar reserva:", error);
      }
    }
    setMostraForm(!mostraForm);
  }
  useEffect(() => {
    getReservesByCourt();
    if (selectedDate) {
      updateAvailableOptions();
    }
  }, [selectedDate]);

  return (
    <>
      <CourtCardStyled color={getColor(props.name)}>
        <h3>{props.name}</h3>
        <p>{countReserves}</p>
        <CourtButtons>
          <Button onclick={mostra} text="Reservar" />
          <Button onclick={sendReserves} text="Ver" />
        </CourtButtons>
      </CourtCardStyled>
      {mostraForm ? (
        <Reservar onSubmit={handleForm}>
          <div>
            <label htmlFor="cliente">Cliente</label>
            <input type="text" name="cliente" />
          </div>
          <div>
            <label htmlFor="data">Dia</label>
            <input
              type="date"
              name="data"
              id="data"
              onChange={handleDateChange}
            />
          </div>
          <div>
            <label htmlFor="hora">Hora</label>
            <select name="hora" id="hora">
              {availableOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>{/* <textarea name="desc"></textarea> */}</div>
          <button type="submit">Reservar</button>
          <p onClick={mostra}>Voltar</p>
        </Reservar>
      ) : null}
      {showConfirmation && (
        <Confirmation>Reserva criada com sucesso!</Confirmation>
      )}
      {showError && <ErrorForm>Erro ao criar Reserva.</ErrorForm>}
    </>
  );
}
