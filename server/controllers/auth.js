import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const picturePath = req.file ? req.file.filename : null;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
    });

    const savedUser = await newUser.save();
    const userResponse = { ...savedUser._doc };
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

/* LOGIN USER */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const userResponse = { ...user._doc };
    delete userResponse.password;

    res.status(200).json({ token, user: userResponse });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
