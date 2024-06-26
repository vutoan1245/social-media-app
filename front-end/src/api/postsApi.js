import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const createPost = async (formData, token) => {
  const response = await axios.post(`${API_BASE_URL}/api/posts`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const likePost = async (postId, token) => {
  const response = await axios.patch(
    `${API_BASE_URL}/api/posts/${postId}/like`,
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
  const response = await axios.get(`${API_BASE_URL}/api/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchComments = async (postId, token) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/posts/${postId}/comments`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const addComment = async (postId, comment, token) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/posts/${postId}/comments`,
    { comment },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
