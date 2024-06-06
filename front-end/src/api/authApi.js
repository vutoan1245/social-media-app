import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
