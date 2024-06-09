import express from "express";
import { login, register } from "../controllers/authController.js";
import { uploadSinglePicture } from "../middleware/fileUploadMiddleware.js";

const router = express.Router();

/**
 * @route   POST /auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/auth/register", uploadSinglePicture, register);

/**
 * @route   POST /auth/login
 * @desc    Login a user
 * @access  Public
 */
router.post("/auth/login", login);

export default router;
