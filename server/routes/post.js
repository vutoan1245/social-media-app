import express from "express";
import {
  createPost,
  getFeedPosts,
  likePost,
  getUserPosts,
} from "../controllers/posts.js";
import { uploadMultiple } from "../middleware/fileUploadMiddleware.js";

const router = express.Router();

// Create a post
router.post("/", uploadMultiple, createPost);

// Get posts of a user
router.get("/:userId/posts", getUserPosts);

// Get posts
router.get("/", getFeedPosts);

// Update a post
router.patch("/:id/like", likePost);

export default router;
