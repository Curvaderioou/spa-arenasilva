import axios from "axios";
import Cookies from "js-cookie";

// const baseURL = "https://api-arena-back.onrender.com";
const baseURL = "http://localhost:3001";

export async function getAllCourts() {
  try {
    const response = await axios.get(`${baseURL}/court`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response;
  } catch (e) {
    return e.message;
  }
}

export async function findCourtById(id) {
  try {
    const response = await axios.get(`${baseURL}/court/${id}`);
    return response;
  } catch (e) {
    return e.message;
  }
}
