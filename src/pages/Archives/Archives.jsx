/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { findAllArchives } from "../../services/archives.service";
import { HomeBody } from "../Home/HomeStyled";
import { Card } from "../../components/Card/Card";
import { ArchiveBody } from "./ArchivesStyled";

export default function Archives() {
  const [reserves, setReserves] = useState([]);

  async function getAllArchives() {
    const archivedReserves = await findAllArchives();
    setReserves(archivedReserves.data.results);
  }

  useEffect(() => {
    getAllArchives();
  }, []);

  return (
    <ArchiveBody>
      {reserves.map((item, index) => (
        <Card
          key={item.id}
          name={item.client}
          date={item.reservedDate}
          court={item.court}
          desc={item.description}
          id={item.id}
          isEven={index % 2 === 0}
          index={index}
          archived={true}
        />
      ))}
    </ArchiveBody>
  );
}
