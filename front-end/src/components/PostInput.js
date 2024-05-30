import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { setPosts } from "state/state";

const PostInput = () => {
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const fetchRes = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: postContent }),
      });

      if (!fetchRes.ok) {
        throw new Error("Failed to create post");
      }

      const posts = await fetchRes.json();
      dispatch(setPosts({ posts }));
    } catch (error) {
      setError("Failed to create post. Please try again.");
      console.error("Post creation error:", error);
    } finally {
      setLoading(false);
      setPostContent("");
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
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Post"}
        </Button>
      </Form>
    </Card>
  );
};

export default PostInput;
