import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const get = api.get;

export { get };
