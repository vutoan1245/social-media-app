import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/state";
import Post from "./Post";
import { formatDistanceToNow } from "date-fns";

// Utility function for time difference calculation
const calculateTimeDifference = (timestamp) => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

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

        const newPosts = posts.map((post) =>
          post._id === res._id ? res : post
        );

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
          key={post._id}
          userId={post.userId}
          postId={post._id}
          profilePic={"https://via.placeholder.com/50"}
          name={`${post.userId.firstName} ${post.userId.lastName}`}
          content={post.content}
          images={post.images}
          timestamp={calculateTimeDifference(post.createdAt)}
          likes={Object.keys(post.likes).length}
          isLiked={!!post.likes[user._id]}
          onLike={onLike}
          picturePath={post.userId.picturePath}
        />
      ))}
    </>
  );
};

export default Feed;
