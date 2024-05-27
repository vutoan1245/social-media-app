import express from "express";
import { createPost, getFeedPosts, likePost } from "../controllers/posts.js";

const router = express.Router();

// Create a post
router.post("/", createPost);

// Get posts
router.get("/", getFeedPosts);

// Update a post
router.patch("/:id/like", likePost);

export default router;
