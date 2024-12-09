import bcrypt from "bcrypt";
import { NotFoundError, ValidationError } from "../utils/customError";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtils";
import User from "../models/User"; // Adjust the path to the User model

export const registerUser = async ({
  fullName,
  userName,
  email,
  password,
  role = "USER",
  isVerified = false,
  isActive = true,
}: {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  role?: string;
  isVerified?: boolean;
  isActive?: boolean;
}) => {
  // Check if user already exists by email or username
  const existingUserByEmail = await User.findOne({ email });
  if (existingUserByEmail) {
    throw new ValidationError("User with email already exists", "email");
  }

  const existingUserByUsername = await User.findOne({ userName });
  if (existingUserByUsername) {
    throw new ValidationError("Username is taken", "userName");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await User.create({
    fullName,
    userName,
    email,
    password: hashedPassword,
    role,
    isVerified,
    isActive,
  });

  return {
    id: user._id,
    fullName: user.fullName,
    userName: user.userName,
    email: user.email,
  };
};
export const authenticateUser = async (
  emailOrUsername: string,
  password: string,
) => {
  // Check if user exists by email or username
  const user = await User.findOne({
    $or: [{ email: emailOrUsername }, { userName: emailOrUsername }],
  });

  if (!user) {
    throw new NotFoundError("User not found", "userName");
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ValidationError("Invalid credentials");
  }

  // Generate tokens

  const accessToken = generateAccessToken({
    id: user._id, // Convert ObjectId to string
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user._id, // Convert ObjectId to string
    email: user.email,
  });

  return {
    user: {
      id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};
export const refreshAccessTokenLogic = async (refreshToken: string) => {
  const decoded: any = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET!,
  );

  const newAccessToken = generateAccessToken({
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
  });

  return newAccessToken;
};
