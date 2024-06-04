import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/state";
import Post from "./Post";

const Feed = () => {
  const dispatch = useDispatch();
  const { posts, token, user } = useSelector((state) => ({
    posts: state.posts,
    token: state.token,
    user: state.user,
  }));

  const onLike = useCallback(
    async (postId) => {
      try {
        const fetchRes = await fetch(
          `http://localhost:3001/posts/${postId}/like`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!fetchRes.ok) {
          throw new Error("Failed to like the post");
        }

        const res = await fetchRes.json();

        const newPosts = posts.map((post) => (post.id === res.id ? res : post));
        dispatch(setPosts({ posts: newPosts }));
      } catch (error) {
        console.error("Error liking post:", error);
      }
    },
    [posts, token, dispatch]
  );

  return (
    <>
      {posts.map((post) => (
        <Post
          key={post.id}
          userId={post.userId.id}
          post={post}
          isLiked={!!post.likes[user.id]}
          onLike={onLike}
        />
      ))}
    </>
  );
};

export default Feed;
