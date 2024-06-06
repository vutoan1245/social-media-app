import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPostToBeginning } from "../state/state";

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
      const fetchRes = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/posts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!fetchRes.ok) {
        throw new Error("Failed to create post");
      }

      const newPost = await fetchRes.json();
      dispatch(
        addPostToBeginning({ post: { ...newPost, userId: { ...user } } })
      );
    } catch (error) {
      setError("Failed to create post. Please try again.");
      console.error("Post creation error:", error);
    } finally {
      setLoading(false);
      setPostContent("");
      setImages([]);
      fileInputRef.current.value = null; // Reset the file input
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
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
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Post"
          )}
        </button>
      </form>
    </div>
  );
};

export default PostInput;
