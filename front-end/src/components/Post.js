import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

const Post = ({
  userId,
  postId,
  profilePic,
  name,
  content,
  timestamp,
  likes,
  isLiked,
  onLike,
}) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile/${userId}`);
  };

  const handleLikeClick = () => {
    onLike(postId);
  };

  const styles = {
    clickable: {
      cursor: "pointer",
    },
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="align-items-center mb-3">
          <Col xs="auto">
            <Image
              src={profilePic}
              roundedCircle
              width="50"
              height="50"
              role="button"
              onClick={handleProfileClick}
              style={styles.clickable}
            />
          </Col>
          <Col>
            <h5 className="mb-0">
              <span
                role="button"
                onClick={handleProfileClick}
                style={styles.clickable}
              >
                {name}
              </span>
              <small className="text-muted">{" - " + timestamp}</small>
            </h5>
          </Col>
        </Row>
        <Card.Text>{content}</Card.Text>
        <Row className="text-center">
          <Col onClick={handleLikeClick} role="button" style={styles.clickable}>
            <i
              className={
                isLiked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"
              }
            />{" "}
            Like {likes}
          </Col>
          <Col role="button" style={styles.clickable}>
            <i className="bi bi-chat-left-text" /> Comment
          </Col>
          <Col role="button" style={styles.clickable}>
            <i className="bi bi-share" /> Share
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Post;
