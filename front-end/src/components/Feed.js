import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state/state";
import Post from "./Post";
import { makeSelectFeed } from "../state/selectors/selectors";

const Feed = () => {
  const dispatch = useDispatch();
  const { posts, token, user } = useSelector(makeSelectFeed);

  const onLike = useCallback(
    async (postId) => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/posts/${postId}/like`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to like the post");
        }

        const updatedPost = await res.json();

        dispatch(setPost({ post: updatedPost }));
      } catch (error) {
        console.error("Error liking post:", error);
      }
    },
    [token, dispatch]
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
