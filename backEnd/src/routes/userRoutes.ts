import express from "express";
import { createUser } from "../controllers/authController";
import {
  checkEmailAvailability,
  checkUsernameAvailability,
} from "../controllers/userController";
const router = express.Router();
router.post("/signup", createUser);
router.get("/checkEmail", checkEmailAvailability);
router.get("/checkUserName", checkUsernameAvailability);
export default router;
