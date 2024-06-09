import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import mainRouter from "./routes/index.js";

// Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const PORT = process.env.PORT || 6001;
const MONGO_URL = process.env.MONGO_URL;

// Ensure 'public/assets' directory exists
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};
ensureDirectoryExists(path.join(__dirname, "public/assets"));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(
  "/assets",
  // static file browser cache settings
  express.static(path.join(__dirname, "public/assets"), {
    maxAge: "30d", // 30 days in milliseconds
    setHeaders: (res, path) => {
      res.set("Cache-Control", "public, max-age=2592000"); // 30 days in seconds
      res.set("Expires", new Date(Date.now() + 2592000000).toUTCString()); // 30 days in milliseconds
    },
  })
);

// Routes
app.use("/api", mainRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// Connect to MongoDB and Start Server
mongoose
  .connect(MONGO_URL, {})
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  });
