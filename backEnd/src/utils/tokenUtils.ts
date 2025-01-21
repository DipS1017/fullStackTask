
import jwt from "jsonwebtoken";

// Access token generation
export const generateAccessToken = (user: {
  id: number | string; // id type depends on your Prisma schema
  email: string;
  role: string;
}) => {
  return jwt.sign({ user }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "1d",
  });
};

// Refresh token generation
export const generateRefreshToken = (user: {
  id: number | string; // id type depends on your Prisma schema
  email: string;
}) => {
  return jwt.sign({ user }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
};

