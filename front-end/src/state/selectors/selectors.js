import { createSelector } from "reselect";

const selectPosts = (state) => state.posts;
const selectToken = (state) => state.token;
const selectUser = (state) => state.user;

export const makeSelectFeed = createSelector(
  [selectPosts, selectToken, selectUser],
  (posts, token, user) => ({ posts, token, user })
);
