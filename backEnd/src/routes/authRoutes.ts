import express from "express";
import {
  loginUser,
  logOutUser,
  refreshAccessToken,
} from "../controllers/authController";

const router = express.Router();
router.post("/login", loginUser);
router.post("/refreshAccessToken", refreshAccessToken);
router.post("/logout", logOutUser);
export default router;
