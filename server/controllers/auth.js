import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = await bycrypt.genSalt();
    const passwordHash = await bycrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(`Register error:`, error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) return res.status(400).json({ message: "User does not exist." });

    const passwordIsMatch = await bycrypt.compare(password, user.password);
    if (!passwordIsMatch)
      return res.status(400).json({ message: "Invalid credentials.}" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    console.log(`Login error:`, error);
    res.status(500).json({ error: error.message });
  }
};
