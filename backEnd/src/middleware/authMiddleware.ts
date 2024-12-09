import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/customError";
import { validateUserId } from "../utils/validateUser";

// Define roles you want to use for access control
export const roles = {
  USER: "USER",
  ADMIN: "ADMIN",
};

export const roleMiddleware = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token; // Get access token from cookies
    if (!token) {
      throw new UnauthorizedError("No access token found", "access_token");
    }

    try {
      // Verify the token
      const decoded: any = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

      // You can access the user's role here
      const userRole = decoded.user.role;
      const userId = decoded.user.id;

      //added userid for later use
      req.userId = userId;

      const validatedUserId = validateUserId(req, next);
      // Check if the user has the required role
      if (userRole !== requiredRole) {
        throw new UnauthorizedError(
          "Unauthorized access, insufficient role",
          "role",
        );
      }

      // Add user information to the request object for later use
      next(); // Allow request to proceed
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError("Token has expired", "access_token");
      }
      next(error); // Pass error to the next handler
    }
  };
};
