import express from "express";
import { getUserInfo, editUserInfo } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { uploadSingle } from "../middleware/fileUploadMiddleware.js";

const router = express.Router();

/**
 * @route   GET /users/:id
 * @desc    Get user information
 * @access  Private
 */
router.get("/:id", verifyToken, getUserInfo);

/**
 * @route   PUT /users/:id
 * @desc    Edit user information
 * @access  Private
 */
router.put("/:id", verifyToken, uploadSingle, editUserInfo);

export default router;
