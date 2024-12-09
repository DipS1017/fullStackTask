import express from "express";
import { loginUser, refreshAccessToken } from "../controllers/authController";

const router = express.Router();
router.post("/login", loginUser);
router.post("/refreshAccessToken", refreshAccessToken);
export default router;
