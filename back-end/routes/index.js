import express from "express";
import authRoutes from "./authRoutes.js";
import postRoutes from "./postRoutes.js";
import commentRoutes from "./commentRoutes.js";
import userRoutes from "./userRoutes.js";
import searchRoutes from "./searchRoutes.js";

const router = express.Router();

router.use(searchRoutes);
router.use(authRoutes);
router.use(postRoutes);
router.use(commentRoutes);
router.use(userRoutes);

export default router;
