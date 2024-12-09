import express from "express";
import cors from "cors";
import { authRoutes, userRoutes } from "./routes";
import cookieParser from "cookie-parser";
import { roleMiddleware, roles } from "./middleware/authMiddleware";

import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import mongoose from "mongoose"; // Import mongoose for MongoDB
dotenv.config();

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [process.env.FRONTEND_URL || ""];
      if (
        (typeof origin === "string" && allowedOrigins.includes(origin)) ||
        !origin
      ) {
        // Allow no origin (for requests like Postman)
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS"), false); // Reject the request
      }
    }, // Allow your frontend domain

    credentials: true, // Allow cookies to be sent
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/admin", roleMiddleware(roles.ADMIN), (req, res) => {
  res.send("welcome");
});

app.get(
  "/api/auth/me",
  roleMiddleware("USER"), // Ensure the user has the "USER" role
  (req, res) => {
    // Since we validated userId, it is now available
    const userId = req.userId;

    res.json({
      message: "Authenticated successfully",
      userId,
    });
  },
);

app.use("/api/auth", authRoutes);
app.use("/api/auth", userRoutes);
app.use(errorHandler);

// MongoDB connection setup
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // MongoDB URI from .env file
    await mongoose.connect(mongoURI!);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure if connection fails
  }
};

// Initialize the app and start the server after connecting to MongoDB
const init = async () => {
  await connectDB(); // Connect to MongoDB before starting the server
  const PORT = process.env.NODESERVER_PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

init();
