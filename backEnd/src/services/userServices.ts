import { ValidationError } from "../utils/customError";
import prisma from "../db/prismaClient"; // Adjust the path to the Prisma client instance

// Function to check if email already exists
export const checkEmail = async (email: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new ValidationError("User with email already exists");
  }
};

// Function to check if username already exists
export const checkUserName = async (userName: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { userName },
  });
  if (existingUser) {
    throw new ValidationError("Username is taken");
  }
};
