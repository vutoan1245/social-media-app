import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const search = async (query, token) => {
  const response = await axios.get(`${API_BASE_URL}/api/search`, {
    params: { query },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
