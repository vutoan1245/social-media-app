import React, { useState, useRef } from "react";
import profileHolder from "../assets/Profile-Photo-Place-Holder.png";
import { useSelector } from "react-redux";

const UserInfo = ({ userInfo, setUserInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    bio: userInfo.bio,
    picturePath: userInfo.picturePath
      ? `http://localhost:3001/assets/${userInfo.picturePath}`
      : profileHolder,
    pictureFile: null, // New state to hold the file object
  });
  const token = useSelector((state) => state.token);
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async () => {
    setIsLoading(true); // Start loading
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("bio", formData.bio);
      if (formData.pictureFile) {
        formDataToSend.append("picture", formData.pictureFile);
      }

      const response = await fetch(
        `http://localhost:3001/user/${userInfo.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUserInfo(updatedUser); // Update the user info in the parent component
        setFormData({
          ...updatedUser,
          picturePath: updatedUser.picturePath
            ? `http://localhost:3001/assets/${updatedUser.picturePath}`
            : profileHolder,
          pictureFile: null, // Reset the pictureFile after save
        });
        setIsEditing(false);
      } else {
        console.error("Failed to update user information");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        picturePath: URL.createObjectURL(file),
        pictureFile: file, // Store the file object
      });
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 relative">
      <button
        onClick={handleEditClick}
        disabled={isLoading}
        className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300 focus:outline-none"
      >
        {isEditing ? (
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        ) : (
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
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        )}
      </button>
      {isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <img
              src={formData.picturePath}
              alt="Profile"
              className="rounded-full w-36 h-36 object-cover mx-auto cursor-pointer"
              onClick={handleImageClick}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <div className="md:col-span-2">
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={isLoading}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={isLoading}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={isLoading}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <button
              onClick={handleSaveClick}
              disabled={isLoading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
            >
              {isLoading ? (
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
                "Save"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <img
              src={formData.picturePath}
              alt="Profile"
              className="rounded-full w-36 h-36 object-cover mx-auto"
            />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold">
              {`${userInfo.firstName} ${userInfo.lastName}`}
            </h2>
            <p className="mt-2 text-gray-600">
              <strong>Joined:</strong> {formatDate(userInfo.createdAt)}
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Bio:</strong> {userInfo.bio}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
