import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://api-arena-back.onrender.com";
// const baseURL = "http://localhost:3001";

export async function signin(data) {
  const response = await axios.post(`${baseURL}/auth/login`, data);
  return response;
}

export async function userLogged() {
  const response = await axios.get(`${baseURL}/user/findById`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}
