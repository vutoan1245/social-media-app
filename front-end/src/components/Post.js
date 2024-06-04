import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import profileHolder from "../assets/Profile-Photo-Place-Holder.png";
import { formatDistanceToNow } from "date-fns";

// Utility function for time difference calculation
const calculateTimeDifference = (timestamp) => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

const Post = ({ userId, post, isLiked, onLike }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile/${userId}`);
  };

  const handleLikeClick = () => {
    onLike(post.id);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="align-items-center mb-3">
          <Col xs="auto">
            <Image
              src={
                post.userId.picturePath
                  ? `http://localhost:3001/assets/${post.userId.picturePath}`
                  : profileHolder
              }
              roundedCircle
              width="50"
              height="50"
              role="button"
              onClick={handleProfileClick}
            />
          </Col>
          <Col>
            <h5 className="mb-0">
              <span role="button" onClick={handleProfileClick}>
                {post.userId.firstName + " " + post.userId.lastName}
              </span>
              <small className="text-muted">
                {" - " + calculateTimeDifference(post.createdAt)}
              </small>
            </h5>
          </Col>
        </Row>
        <Card.Text>{post.content}</Card.Text>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {post.images.map((image, index) => (
            <Image
              key={index}
              src={`http://localhost:3001/assets/${image}`}
              thumbnail
              style={{
                maxWidth: "150px",
                maxHeight: "150px",
                objectFit: "cover",
                margin: "2px",
              }}
            />
          ))}
        </div>
        <Row className="text-center mt-3">
          <Col onClick={handleLikeClick} role="button">
            <i
              className={
                isLiked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"
              }
            />{" "}
            Like {Object.keys(post.likes).length}
          </Col>
          <Col role="button">
            <i className="bi bi-chat-left-text" /> Comment
          </Col>
          <Col role="button">
            <i className="bi bi-share" /> Share
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Post;
