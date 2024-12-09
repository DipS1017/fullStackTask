import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res.status(err.errorCode).json({
      statusCode: err.errorCode,
      errorType: err.errorType,
      errors: err.serializeErrors(),
    });
  }
  //handle unkown errors

  console.error("Something went wrong", err);
  return res.status(500).json({ message: "Something went wrong." });
};
