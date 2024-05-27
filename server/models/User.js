import mongoose from "mongoose";

const UserScheme = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      min: 2,
      max: 100,
    },
    lastName: {
      type: String,
      require: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      min: 2,
      max: 100,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserScheme);

export default User;
