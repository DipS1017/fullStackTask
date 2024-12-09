import { NextFunction, Request, Response } from "express";
import {
  authenticateUser,
  refreshAccessTokenLogic,
  registerUser,
} from "../services/authService";
import { NotFoundError, ValidationError } from "../utils/customError";

// Register a new user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { fullName, userName, email, password, role, isVerified, isActive } =
    req.body;

  if (!fullName || !userName || !email || !password) {
    return next(new ValidationError("All fields are required"));
  }

  try {
    const user = await registerUser({
      fullName,
      userName,
      email,
      password,
      role,
      isVerified,
      isActive,
    });

    // Return success response
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("error registering user:", error);
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { emailOrUsername, password } = req.body;

  // Synchronous validation: check if fields are missing
  if (!emailOrUsername || !password) {
    return next(new ValidationError("Email and password are both required"));
  }
  try {
    const { user, accessToken, refreshToken } = await authenticateUser(
      emailOrUsername,
      password,
    );

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.Node_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.Node_ENV == "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "login successfull",
      user,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //request the refresh token from cookies
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return next(new NotFoundError("No refresh Token Found"));
  }
  try {
    const newAccessToken = await refreshAccessTokenLogic(refreshToken);
    res.status(200).json({
      message: "new access token received",
      accesstoken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};
export const logOutUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.Node_ENV === "production",
      sameSite: "strict",
    });

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.Node_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logout Sucessful" });
  } catch (error) {
    next(error);
  }
};
