import User from "../models/User.js";
import Post from "../models/Post.js";
import redisClient from "../utils/redisClient.js";
import { indexUser } from "../config/elasticClient.js";

const USER_CACHE_PREFIX = "user:";
const CACHE_EXPIRATION = 3600; // Cache expiration time in seconds (e.g., 1 hour)

/* GET USER INFO */
export const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const cachedUser = await redisClient.get(`${USER_CACHE_PREFIX}${userId}`);

    if (cachedUser) {
      // If cached data exists, return it
      return res.status(200).json(JSON.parse(cachedUser));
    }

    const user = await User.findById(userId).select("-password -email"); // Exclude the password and email from the result

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Index user in Elasticsearch
    await indexUser({
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      picturePath: user.picturePath,
    });

    // Store the data in the cache
    await redisClient.set(
      `${USER_CACHE_PREFIX}${userId}`,
      JSON.stringify(user),
      "EX",
      CACHE_EXPIRATION
    );

    res.status(200).json(user);
  } catch (err) {
    console.error("Get user info error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

/* EDIT USER INFO */
export const editUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUser = req.user.id; // The user making the request
    if (userId !== currentUser) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { firstName, lastName, bio } = req.body;
    const picturePath = req.file ? req.file.filename : undefined;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, bio, picturePath },
      { new: true, runValidators: true }
    ).select("-password -email");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Index updated user in Elasticsearch
    await indexUser({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      bio: updatedUser.bio,
      picturePath: updatedUser.picturePath,
    });

    // Update the cache with the new data
    await redisClient.set(
      `${USER_CACHE_PREFIX}${userId}`,
      JSON.stringify(updatedUser),
      "EX",
      CACHE_EXPIRATION
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Edit user info error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

/* Get USER POSTS */
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId })
      .populate("userId", "firstName lastName picturePath")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
