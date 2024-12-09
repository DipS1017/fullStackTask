import jwt from "jsonwebtoken";
import { Types } from "mongoose";
//access token generation
export const generateAccessToken = (user: {
  id: string | Types.ObjectId;
  email: string;
  role: string;
}) => {
  return jwt.sign({ user }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "1d",
  });
};

//refresh token generation
export const generateRefreshToken = (user: {
  id: string | Types.ObjectId;
  email: string;
}) => {
  return jwt.sign({ user }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
};
