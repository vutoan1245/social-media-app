import User from "../models/User.js";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 }); // Cache for 100 seconds

/* GET USER INFO */
export const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the data is in the cache
    const cachedUser = cache.get(userId);
    if (cachedUser) {
      console.log("Data from cache");
      return res.status(200).json(cachedUser);
    }

    const user = await User.findById(userId).select("-password -email"); // Exclude the password and email from the result

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Store the data in the cache
    cache.set(userId, user);

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

    // Update the cache with the new data
    cache.set(userId, updatedUser);

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Edit user info error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
