import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const createPost = async (formData, token) => {
  const response = await axios.post(`${API_BASE_URL}/posts`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const likePost = async (postId, token) => {
  const response = await axios.patch(
    `${API_BASE_URL}/posts/${postId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const fetchPosts = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
