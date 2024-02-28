import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://api-arena-back.onrender.com";
// const baseURL = "http://localhost:3001";

export async function createArchive(client, reservedDate, court) {
  try {
    const response = await axios.post(
      `${baseURL}/archive/create`,
      { client: client, reservedDate: reservedDate, court: court },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response;
  } catch (e) {
    return e.message;
  }
}

export async function findAllArchives() {
  try {
    const response = await axios.get(`${baseURL}/archive/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response;
  } catch (e) {
    return e.message;
  }
}
