import { Request, NextFunction } from "express";
import { ValidationError } from "./customError";

export const validateUserId = (req: Request, next: NextFunction): number => {
  const userId = req.userId;
  if (!userId) {
    next(new ValidationError("user not authenticated"));
    throw new Error();
  }
  return userId;
};
