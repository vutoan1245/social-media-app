import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Card } from "react-bootstrap";
import { setPosts } from "state/state";

const PostInput = () => {
  const [postContent, setPostContent] = useState("");
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fetchRes = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: postContent }),
      });
      const posts = await fetchRes.json();

      if (posts) dispatch(setPosts({ posts }));
    } catch (error) {
      console.log(`SignUp error`, error);
    }

    setPostContent("");
  };

  return (
    <Card
      className="mb-3"
      style={{
        padding: "10px",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="postContent">
          <p>Create a new post</p>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="mb-2"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Post
        </Button>
      </Form>
    </Card>
  );
};

export default PostInput;
