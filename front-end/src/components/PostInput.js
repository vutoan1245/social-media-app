import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPostToBeginning } from "../state/state";
import { ImageIcon, SpinnerIcon } from "../assets/icons";
import { createPost } from "../api/postsApi";

const PostInput = () => {
  const [postContent, setPostContent] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("content", postContent);
    images.forEach((image) => {
      formData.append("pictures", image);
    });

    try {
      const newPost = await createPost(formData, token);
      dispatch(
        addPostToBeginning({ post: { ...newPost, userId: { ...user } } })
      );
      setPostContent("");
      setImages([]);
      fileInputRef.current.value = null;
    } catch (error) {
      setError("Failed to create post. Please try again.");
      console.error("Post creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="">
          <strong className="block text-gray-700">Create a new post</strong>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}
          <textarea
            rows="3"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            disabled={loading}
          />
        </div>
        <div className="">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              <ImageIcon />
            </button>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="hidden"
              ref={fileInputRef}
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt="Selected"
              className="w-36 h-36 object-cover m-1 rounded"
            />
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? <SpinnerIcon /> : "Post"}
        </button>
      </form>
    </div>
  );
};

export default PostInput;
