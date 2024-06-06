import express from "express";
import {
  createPost,
  getFeedPosts,
  likePost,
} from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { uploadMultiple } from "../middleware/fileUploadMiddleware.js";

const router = express.Router();

/**
 * @route   POST /posts
 * @desc    Create a new post
 * @access  Private
 */
router.post("/", verifyToken, uploadMultiple, createPost);

/**
 * @route   GET /posts
 * @desc    Get all posts (feed)
 * @access  Private
 */
router.get("/", verifyToken, getFeedPosts);

/**
 * @route   PATCH /posts/:id/like
 * @desc    Like or unlike a post
 * @access  Private
 */
router.patch("/:id/like", verifyToken, likePost);

export default router;
