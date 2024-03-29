import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://api-arena-back.onrender.com";
// const baseURL = "http://localhost:3001";

export async function getAllReserves() {
  try {
    const response = await axios.get(`${baseURL}/reserve`);
    return response;
  } catch (e) {
    return e.message;
  }
}

export async function getAllReservesOnDate(date) {
  try {
    const response = await axios.get(`${baseURL}/reserve/date?date=${date}`);
    return response;
  } catch (e) {
    return e.message;
  }
}

export async function getAllReserverByCourtId(id) {
  try {
    const response = await axios.get(`${baseURL}/reserve/byCourtId/${id}`);
    return response;
  } catch (e) {
    return e.message;
  }
}

export async function createReserve(client, reservedDate, description, court) {
  try {
    const response = await axios.post(
      `${baseURL}/reserve/create`,
      { client, reservedDate, description, court },
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

export async function deleteReserve(id) {
  try {
    const response = await axios.delete(`${baseURL}/reserve/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response;
  } catch (e) {
    return e.message;
  }
}

export async function findReserveByCourtId(id) {
  try {
    const response = await axios.get(`${baseURL}/reserve/byCourtId/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response;
  } catch (e) {
    return e.message;
  }
}

export async function updateReserve(id, data) {
  try {
    const response = await axios.patch(
      `${baseURL}/reserve/update/${id}`,
      { client: data },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    const updatedReserve = response.data;

    return updatedReserve;
  } catch (error) {
    return error;
  }
}

export async function searchReserveByClient(client) {
  try {
    const response = await axios.get(
      `${baseURL}/reserve/search?client=${client}`
    );
    return response;
  } catch (e) {
    return e;
  }
}
