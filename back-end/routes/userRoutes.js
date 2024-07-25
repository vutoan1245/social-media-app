import express from "express";
import {
  getUserPosts,
  getUserInfo,
  editUserInfo,
  followUser,
  unfollowUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { uploadSinglePicture } from "../middleware/fileUploadMiddleware.js";

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
router.put("/user/:id", verifyToken, uploadSinglePicture, editUserInfo);

/**
 * @route   POST /user/:id/follow
 * @desc    Follow a user
 * @access  Private
 */
router.post("/user/:id/follow", verifyToken, followUser);

/**
 * @route   POST /user/:id/unfollow
 * @desc    Unfollow a user
 * @access  Private
 */
router.post("/user/:id/unfollow", verifyToken, unfollowUser);

export default router;