import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchUserData = async (userId, token) => {
  const response = await axios.get(`${API_BASE_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateUser = async (userId, formData, token) => {
  const response = await axios.put(`${API_BASE_URL}/user/${userId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
