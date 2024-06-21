import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { searchQuery } from "../config/elasticClient.js";

const router = express.Router();

// Search for posts and users
router.get("/search", verifyToken, async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    // Search for posts that match the query
    const posts = await Post.find({
      content: { $regex: query, $options: "i" },
    }).populate("userId", "firstName lastName picturePath");

    const elasticSearchRes = await searchQuery(query);

    // Search for users that match the query
    const users = await User.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
      ],
    }).select("-password -email");

    res.status(200).json({ posts, users, elasticSearchRes });
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
