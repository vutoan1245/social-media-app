import axios from "axios";
import { API_BASE_URL } from "@env";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (email, password) => {
  return api.post("/api/auth/login", { email, password });
};

export const registerUser = async (userData) => {
  return api.post("/api/auth/register", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default api;
