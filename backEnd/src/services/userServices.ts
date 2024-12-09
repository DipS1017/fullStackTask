import { ValidationError } from "../utils/customError";
import User from "../models/User"; // Adjust the path to your Mongoose User model

// Function to check if email already exists
export const checkEmail = async (email: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ValidationError("User with email already exists");
  }
};

// Function to check if username already exists
export const checkUserName = async (userName: string) => {
  const existingUser = await User.findOne({ userName });
  if (existingUser) {
    throw new ValidationError("Username is taken");
  }
};
