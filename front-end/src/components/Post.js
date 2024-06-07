import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profileHolder from "../assets/Profile-Photo-Place-Holder.png";
import { formatDistanceToNow } from "date-fns";
import { setPost } from "../state/state";
import { LikeIcon, CommentIcon, ShareIcon } from "../assets/icons";
import { likePost, fetchComments, addComment } from "../api/postsApi";

const calculateTimeDifference = (timestamp) => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

const Post = ({ post }) => {
  const token = useSelector((state) => state.token);
  const currUserId = useSelector((state) => state.user.id);
  const isLiked = !!post.likes[currUserId];
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfileClick = () => navigate(`/profile/${post.userId.id}`);

  const onLike = async (postId) => {
    try {
      const updatedPost = await likePost(postId, token);
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const toggleComments = async () => {
    setShowComments(!showComments);
    if (!showComments) {
      try {
        const fetchedComments = await fetchComments(post.id, token);
        setComments(fetchedComments.slice(0, 3));
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const comment = await addComment(post.id, newComment, token);
      setComments([comment, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
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
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleComments}
        >
          <CommentIcon />
          <span className="ml-1">Comment</span>
        </div>
        <div className="flex items-center cursor-pointer">
          <ShareIcon />
          <span className="ml-1">Share</span>
        </div>
      </div>
      {showComments && (
        <div className="mt-4">
          <div>
            {comments.toReversed().map((comment) => (
              <div
                key={comment._id}
                className="mb-2 p-2 border-b border-gray-200 flex items-start"
              >
                <img
                  src={
                    comment.userId.picturePath
                      ? `${process.env.REACT_APP_API_BASE_URL}/assets/${comment.userId.picturePath}`
                      : profileHolder
                  }
                  alt="Profile"
                  className="rounded-full w-8 h-8 object-cover mr-2"
                />
                <div>
                  <div className="flex items-center">
                    <p className="text-sm font-semibold mr-2">
                      {comment.userId.firstName + " " + comment.userId.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {calculateTimeDifference(comment.createdAt)}
                    </p>
                  </div>
                  <p className="text-sm">{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleAddComment} className="mt-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
