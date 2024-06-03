import User from "../models/User.js";

/* GET USER INFO */
export const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from the request parameters
    const user = await User.findById(userId).select("-password -email"); // Exclude the password and email from the result

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Get user info error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

/* EDIT USER INFO */
export const editUserInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const requestedUserId = req.params.id; // Get user ID from the request parameters

    if (userId !== requestedUserId) {
      return res.status(403).json({ message: "Access Denied" });
    }

    const { firstName, lastName, bio } = req.body;
    const picturePath = req.file ? req.file.filename : undefined;

    // Find user by ID and update the user information
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, bio, picturePath },
      { new: true, runValidators: true }
    ).select("-password -email");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Edit user info error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
