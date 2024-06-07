import express from "express";
import {
  getUserPosts,
  getUserInfo,
  editUserInfo,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { uploadSingle } from "../middleware/fileUploadMiddleware.js";

const router = express.Router();

/**
 * @route   GET /user/:userId/posts
 * @desc    Get all posts by a specific user
 * @access  Private
 */
router.get("/user/:userId/posts", verifyToken, getUserPosts);

/**
 * @route   GET /user/:id
 * @desc    Get user information
 * @access  Private
 */
router.get("/user/:id", verifyToken, getUserInfo);

/**
 * @route   PUT /user/:id
 * @desc    Edit user information
 * @access  Private
 */
router.put("/user/:id", verifyToken, uploadSingle, editUserInfo);

export default router;
