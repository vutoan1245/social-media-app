import express from "express";
import postRoutes from "./postRoutes.js";
import commentRoutes from "./commentRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.use("/posts", postRoutes);
router.use(commentRoutes);
router.use("/user", userRoutes);

export default router;
