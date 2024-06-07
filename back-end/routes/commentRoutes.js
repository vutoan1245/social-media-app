import express from "express";
import {
  addComment,
  getComments,
  deleteComment,
} from "../controllers/commentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /posts/:postId/comments
 * @desc    Add a comment to a post
 * @access  Private
 */
router.post("/posts/:postId/comments", verifyToken, addComment);

/**
 * @route   GET /posts/:postId/comments
 * @desc    Get all comments for a post
 * @access  Private
 */
router.get("/posts/:postId/comments", verifyToken, getComments);

/**
 * @route   DELETE /posts/:postId/comments/:commentId
 * @desc    Delete a comment from a post
 * @access  Private
 */
router.delete("/posts/:postId/comments/:commentId", verifyToken, deleteComment);

export default router;
