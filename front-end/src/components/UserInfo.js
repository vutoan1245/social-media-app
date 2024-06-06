import React, { useState, useRef } from "react";
import profileHolder from "../assets/Profile-Photo-Place-Holder.png";
import { useSelector } from "react-redux";
import { EditIcon, CancelIcon, SpinnerIcon } from "../assets/icons";

const UserInfo = ({ userInfo, setUserInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    bio: userInfo.bio,
    picturePath: userInfo.picturePath
      ? `${process.env.REACT_APP_API_BASE_URL}/assets/${userInfo.picturePath}`
      : profileHolder,
    pictureFile: null, // New state to hold the file object
  });
  const token = useSelector((state) => state.token);
  const fileInputRef = useRef(null);
  const currUserId = useSelector((state) => state.user.id);
  const isEditable = userInfo.id === currUserId;

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
        `${process.env.REACT_APP_API_BASE_URL}/user/${userInfo.id}`,
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
            ? `${process.env.REACT_APP_API_BASE_URL}/assets/${updatedUser.picturePath}`
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
      {isEditable && (
        <button
          onClick={handleEditClick}
          disabled={isLoading}
          className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300 focus:outline-none"
        >
          {isEditing ? <CancelIcon /> : <EditIcon />}
        </button>
      )}

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
              {isLoading ? <SpinnerIcon /> : "Save"}
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
