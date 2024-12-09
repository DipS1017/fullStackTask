import { Request, Response, NextFunction } from "express";
import { checkEmail, checkUserName } from "../services/userServices";
import { ValidationError } from "../utils/customError";

// Controller to check email availability
export const checkEmailAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.query;

  if (!email || typeof email !== "string") {
    return next(new ValidationError("Invalid or missing email parameter"));
  }

  try {
    await checkEmail(email); // Check if email exists
    res.status(200).json({ message: "Email is available" });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

// Controller to check username availability
export const checkUsernameAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userName } = req.query;

  if (!userName || typeof userName !== "string") {
    return next(new ValidationError("Invalid or missing username parameter"));
  }

  try {
    await checkUserName(userName); // Check if username exists
    res.status(200).json({ message: "Username is available" });
  } catch (error) {
    next(error);
  }
};
