import { useEffect, useState } from "react";
import { getAllCourts } from "../../services/courtService";
import { CourtStyled } from "./CourtStyled";
import { CourtCard } from "../../components/CourtCard/CourtCard";

export function Court() {
  const [court, setCourt] = useState([]);

  async function findCourts() {
    const courtResponse = await getAllCourts();
    setCourt(courtResponse.data.results);
  }

  useEffect(() => {
    findCourts();
  }, []);

  return (
    <CourtStyled>
      {court.map((item) => (
        <CourtCard key={item.id} name={item.name} id={item.id} />
      ))}
    </CourtStyled>
  );
}
