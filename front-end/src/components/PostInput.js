import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Card, Alert, Spinner, Image } from "react-bootstrap";
import { addPostToBeginning } from "state/state";

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
      const fetchRes = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

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
    <Card className="mb-3 p-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="postContent">
          <Form.Label>Create a new post</Form.Label>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="mb-2"
            disabled={loading}
          />
        </Form.Group>
        <Form.Group controlId="postImages">
          <Form.Label>Upload images</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={handleImageChange}
            className="mb-2"
            ref={fileInputRef}
            disabled={loading}
          />
        </Form.Group>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {images.map((image, index) => (
            <Image
              key={index}
              src={URL.createObjectURL(image)}
              thumbnail
              // className="me-2"
              style={{
                maxWidth: "150px",
                maxHeight: "150px",
                objectFit: "cover",
                margin: "2px",
              }}
            />
          ))}
        </div>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Post"}
        </Button>
      </Form>
    </Card>
  );
};

export default PostInput;
