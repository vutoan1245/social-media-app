import express from "express";
import { login, register } from "../controllers/auth.js";
import { uploadSingle } from "../middleware/fileUploadMiddleware.js";

const router = express.Router();

router.post("/register", uploadSingle, register);
router.post("/login", login);

export default router;
