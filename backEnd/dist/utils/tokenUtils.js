"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Access token generation
var generateAccessToken = function (user) {
    return jsonwebtoken_1.default.sign({ user: user }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "1d",
    });
};
exports.generateAccessToken = generateAccessToken;
// Refresh token generation
var generateRefreshToken = function (user) {
    return jsonwebtoken_1.default.sign({ user: user }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });
};
exports.generateRefreshToken = generateRefreshToken;
