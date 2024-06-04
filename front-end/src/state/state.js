import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  posts: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.posts = [];
    },
    setPosts: (state, { payload: { posts } }) => {
      state.posts = posts;
    },
    setPost: (state, { payload: { post } }) => {
      state.posts = state.posts.map((p) => (p.id === post.id ? post : p));
    },
  },
});

export const { setLogin, setLogout, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;
