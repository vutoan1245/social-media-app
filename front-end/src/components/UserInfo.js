import React, { useState, useRef } from "react";
import { Card, Row, Col, Image, Button, Form } from "react-bootstrap";
import profileHolder from "../assets/Profile-Photo-Place-Holder.png";
import { useSelector } from "react-redux";

const UserInfo = ({ userInfo, setUserInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    bio: userInfo.bio,
    picturePath: userInfo.picturePath,
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
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("bio", formData.bio);
      if (formData.pictureFile) {
        formDataToSend.append("picture", formData.pictureFile);
      }

      const response = await fetch(
        `http://localhost:3001/user/${userInfo._id}`,
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
          pictureFile: null, // Reset the pictureFile after save
        });
        setIsEditing(false);
      } else {
        console.error("Failed to update user information");
      }
    } catch (error) {
      console.error("Error saving data:", error);
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
    <Card className="mb-3" style={{ padding: "10px", position: "relative" }}>
      <Button
        variant="primary"
        size="sm"
        style={{ position: "absolute", top: "10px", right: "10px" }}
        onClick={handleEditClick}
      >
        {isEditing ? "Cancel" : "Edit"}
      </Button>
      {isEditing ? (
        <>
          <Row className="justify-content-md-center">
            <Col md={3} className="text-center">
              <Image
                src={
                  userInfo.picturePath
                    ? `http://localhost:3001/assets/${userInfo.picturePath}`
                    : profileHolder
                }
                roundedCircle
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={handleImageClick}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Col>
            <Col md={9}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="success" onClick={handleSaveClick}>
                Save
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row className="justify-content-md-center">
            <Col md={3} className="text-center">
              <Image
                src={
                  userInfo.picturePath
                    ? `http://localhost:3001/assets/${userInfo.picturePath}`
                    : profileHolder
                }
                roundedCircle
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </Col>
            <Col md={9}>
              <h2>{`${userInfo.firstName} ${userInfo.lastName}`}</h2>
              <p>{userInfo.bio}</p>
              <p>
                <strong>Joined:</strong> {formatDate(userInfo.createdAt)}
              </p>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
};

export default UserInfo;
