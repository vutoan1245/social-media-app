import express from "express";
import { getUserInfo, editUserInfo } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { uploadSingle } from "../middleware/fileUploadMiddleware.js";

const router = express.Router();

// Route to get user information
router.get("/:id", verifyToken, getUserInfo);

// Route to edit user information
router.put("/:id", verifyToken, uploadSingle, editUserInfo);

export default router;
