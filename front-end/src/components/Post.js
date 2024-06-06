import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profileHolder from "../assets/Profile-Photo-Place-Holder.png";
import { formatDistanceToNow } from "date-fns";
import { setPost } from "../state/state";
import { LikeIcon, CommentIcon, ShareIcon } from "../assets/icons";
import { likePost } from "../api/postsApi";

const calculateTimeDifference = (timestamp) => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

const Post = ({ userId, post, isLiked }) => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfileClick = () => navigate(`/profile/${userId}`);

  const onLike = async (postId) => {
    try {
      const updatedPost = await likePost(postId, token);
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <img
          src={
            post.userId.picturePath
              ? `${process.env.REACT_APP_API_BASE_URL}/assets/${post.userId.picturePath}`
              : profileHolder
          }
          alt="Profile"
          className="rounded-full w-12 h-12 object-cover cursor-pointer"
          onClick={handleProfileClick}
        />
        <div className="ml-4">
          <h5
            className="text-lg font-semibold cursor-pointer"
            onClick={handleProfileClick}
          >
            {post.userId.firstName + " " + post.userId.lastName}
          </h5>
          <p className="text-gray-500 text-sm">
            {calculateTimeDifference(post.createdAt)}
          </p>
        </div>
      </div>
      <p className="mb-4">{post.content}</p>
      <div className="flex flex-wrap mb-4">
        {post.images.map((image, index) => (
          <img
            key={index}
            src={`${process.env.REACT_APP_API_BASE_URL}/assets/${image}`}
            alt={`Post ${index + 1}`}
            className="w-36 h-36 object-cover m-1 rounded"
          />
        ))}
      </div>
      <div className="flex justify-around text-center text-gray-700">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => onLike(post.id)}
        >
          <LikeIcon isLiked={isLiked} />
          <span className="ml-1">Like {Object.keys(post.likes).length}</span>
        </div>
        <div className="flex items-center cursor-pointer">
          <CommentIcon />
          <span className="ml-1">Comment</span>
        </div>
        <div className="flex items-center cursor-pointer">
          <ShareIcon />
          <span className="ml-1">Share</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
