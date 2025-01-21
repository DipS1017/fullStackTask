
import bcrypt from "bcrypt";
import { NotFoundError, ValidationError } from "../utils/customError";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtils";
import prisma from "../db/prismaClient"; // Import the Prisma client instance

// Register a new user
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
  const existingUserByEmail = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUserByEmail) {
    throw new ValidationError("User with email already exists", "email");
  }

  const existingUserByUsername = await prisma.user.findUnique({
    where: { userName },
  });
  if (existingUserByUsername) {
    throw new ValidationError("Username is taken", "userName");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await prisma.user.create({
    data: {
      fullName,
      userName,
      email,
      password: hashedPassword,
      role,
      isVerified,
      isActive,
    },
  });

  return {
    id: user.id, // Prisma-generated id (number)
    fullName: user.fullName,
    userName: user.userName,
    email: user.email,
  };
};

// Authenticate the user (login)
export const authenticateUser = async (
  emailOrUsername: string,
  password: string,
) => {
  // Check if user exists by email or username
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrUsername }, { userName: emailOrUsername }],
    },
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
    id: user.id, // Prisma-generated id (number)
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user.id, // Use the Prisma-generated user ID (number)
    email: user.email,
  });

  return {
    user: {
      id: user.id, // Prisma-generated id (number)
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

// Refresh access token using the refresh token
export const refreshAccessTokenLogic = async (refreshToken: string) => {
  const decoded: any = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET!
  );

  const newAccessToken = generateAccessToken({
    id: decoded.id, // number
    email: decoded.email,
    role: decoded.role,
  });

  return newAccessToken;
};

