/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { Card } from "../../components/Card/Card";
import { useEffect, useState } from "react";
import { searchReserveByClient } from "../../services/reserveServices";
import { ContainerResults, SearchReserves, TextResults } from "./SearchStyled";

export default function Search() {
  const { client } = useParams();
  const [reserves, setReserves] = useState([]);

  async function search() {
    try {
      const reservesApi = await searchReserveByClient(client);
      setReserves(reservesApi.data.foundReserve);
    } catch (error) {
      console.log(error);
      setReserves([]);
    }
  }

  useEffect(() => {
    search();
  }, [client]);

  return (
    <>
      <ContainerResults>
        <TextResults>
          <span>
            {Array.isArray(reserves) && reserves.length > 0
              ? `Encontramos ${reserves.length} ${
                  reserves.length > 1 ? "resultados" : "resultado"
                } para: `
              : "Não encontramos resultados para:"}
          </span>
          <h2>{client}</h2>
        </TextResults>
        <SearchReserves>
          {Array.isArray(reserves) ? (
            reserves.map((item, index) => (
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
          ) : (
            <p>Nenhum resultado encontrado</p>
          )}
        </SearchReserves>
      </ContainerResults>
    </>
  );
}
