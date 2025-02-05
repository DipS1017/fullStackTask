import express from "express";
import cors from "cors";
import { authRoutes, userRoutes } from "./routes";
import cookieParser from "cookie-parser";
import { roleMiddleware, roles } from "./middleware/authMiddleware";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import prisma from "./db/prismaClient"; 

dotenv.config();

const app = express();

// Log the value of FRONTEND_URL before using it in cors
console.log("Frontend URL:", process.env.FRONTEND_URL);

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Make sure it's the correct URL
    credentials: true, // Allow cookies and credentials
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/admin", roleMiddleware(roles.ADMIN), (req, res) => {
  res.send("welcome");
});

app.get("/api/auth/me", roleMiddleware("USER"), (req, res) => {
  const userId = req.userId;

  res.json({
    message: "Authenticated successfully",
    userId,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/auth", userRoutes);
app.use(errorHandler);

// Prisma connection setup
const connectDB = async () => {
  try {
    // Prisma automatically manages the database connection
    await prisma.$connect();
    console.log("Postgres connected successfully");
  } catch (error) {
    console.error("Error connecting to Postgres:", error);
    process.exit(1);
  }
};

const init = async () => {
  await connectDB();
  const PORT = process.env.NODESERVER_PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

init();
