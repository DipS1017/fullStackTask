"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = exports.roles = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var customError_1 = require("../utils/customError");
var validateUser_1 = require("../utils/validateUser");
// Define roles you want to use for access control
exports.roles = {
    USER: "USER",
    ADMIN: "ADMIN",
};
var roleMiddleware = function (requiredRole) {
    return function (req, res, next) {
        var token = req.cookies.access_token; // Get access token from cookies
        if (!token) {
            throw new customError_1.UnauthorizedError("No access token found", "access_token");
        }
        try {
            // Verify the token
            var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
            // You can access the user's role here
            var userRole = decoded.user.role;
            var userId = decoded.user.id;
            //added userid for later use
            req.userId = userId;
            var validatedUserId = (0, validateUser_1.validateUserId)(req, next);
            // Check if the user has the required role
            if (userRole !== requiredRole) {
                throw new customError_1.UnauthorizedError("Unauthorized access, insufficient role", "role");
            }
            // Add user information to the request object for later use
            next(); // Allow request to proceed
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                throw new customError_1.UnauthorizedError("Token has expired", "access_token");
            }
            next(error); // Pass error to the next handler
        }
    };
};
exports.roleMiddleware = roleMiddleware;
