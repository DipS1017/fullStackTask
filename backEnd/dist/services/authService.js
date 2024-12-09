"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessTokenLogic = exports.authenticateUser = exports.registerUser = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var customError_1 = require("../utils/customError");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var tokenUtils_1 = require("../utils/tokenUtils");
var User_1 = __importDefault(require("../models/User")); // Adjust the path to the User model
var registerUser = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var existingUserByEmail, existingUserByUsername, hashedPassword, user;
    var fullName = _b.fullName, userName = _b.userName, email = _b.email, password = _b.password, _c = _b.role, role = _c === void 0 ? "USER" : _c, _d = _b.isVerified, isVerified = _d === void 0 ? false : _d, _e = _b.isActive, isActive = _e === void 0 ? true : _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0: return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                existingUserByEmail = _f.sent();
                if (existingUserByEmail) {
                    throw new customError_1.ValidationError("User with email already exists", "email");
                }
                return [4 /*yield*/, User_1.default.findOne({ userName: userName })];
            case 2:
                existingUserByUsername = _f.sent();
                if (existingUserByUsername) {
                    throw new customError_1.ValidationError("Username is taken", "userName");
                }
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 3:
                hashedPassword = _f.sent();
                return [4 /*yield*/, User_1.default.create({
                        fullName: fullName,
                        userName: userName,
                        email: email,
                        password: hashedPassword,
                        role: role,
                        isVerified: isVerified,
                        isActive: isActive,
                    })];
            case 4:
                user = _f.sent();
                return [2 /*return*/, {
                        id: user._id,
                        fullName: user.fullName,
                        userName: user.userName,
                        email: user.email,
                    }];
        }
    });
}); };
exports.registerUser = registerUser;
var authenticateUser = function (emailOrUsername, password) { return __awaiter(void 0, void 0, void 0, function () {
    var user, isPasswordValid, accessToken, refreshToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.default.findOne({
                    $or: [{ email: emailOrUsername }, { userName: emailOrUsername }],
                })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new customError_1.NotFoundError("User not found", "userName");
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 2:
                isPasswordValid = _a.sent();
                if (!isPasswordValid) {
                    throw new customError_1.ValidationError("Invalid credentials");
                }
                accessToken = (0, tokenUtils_1.generateAccessToken)({
                    id: user._id, // Convert ObjectId to string
                    email: user.email,
                    role: user.role,
                });
                refreshToken = (0, tokenUtils_1.generateRefreshToken)({
                    id: user._id, // Convert ObjectId to string
                    email: user.email,
                });
                return [2 /*return*/, {
                        user: {
                            id: user._id,
                            fullName: user.fullName,
                            userName: user.userName,
                            email: user.email,
                        },
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    }];
        }
    });
}); };
exports.authenticateUser = authenticateUser;
var refreshAccessTokenLogic = function (refreshToken) { return __awaiter(void 0, void 0, void 0, function () {
    var decoded, newAccessToken;
    return __generator(this, function (_a) {
        decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        newAccessToken = (0, tokenUtils_1.generateAccessToken)({
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        });
        return [2 /*return*/, newAccessToken];
    });
}); };
exports.refreshAccessTokenLogic = refreshAccessTokenLogic;
