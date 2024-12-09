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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOutUser = exports.refreshAccessToken = exports.loginUser = exports.createUser = void 0;
var authService_1 = require("../services/authService");
var customError_1 = require("../utils/customError");
// Register a new user
var createUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fullName, userName, email, password, role, isVerified, isActive, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, fullName = _a.fullName, userName = _a.userName, email = _a.email, password = _a.password, role = _a.role, isVerified = _a.isVerified, isActive = _a.isActive;
                if (!fullName || !userName || !email || !password) {
                    return [2 /*return*/, next(new customError_1.ValidationError("All fields are required"))];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, authService_1.registerUser)({
                        fullName: fullName,
                        userName: userName,
                        email: email,
                        password: password,
                        role: role,
                        isVerified: isVerified,
                        isActive: isActive,
                    })];
            case 2:
                user = _b.sent();
                // Return success response
                return [2 /*return*/, res.status(201).json({ message: "User created successfully", user: user })];
            case 3:
                error_1 = _b.sent();
                console.error("error registering user:", error_1);
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var loginUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, emailOrUsername, password, _b, user, accessToken, refreshToken, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, emailOrUsername = _a.emailOrUsername, password = _a.password;
                // Synchronous validation: check if fields are missing
                if (!emailOrUsername || !password) {
                    return [2 /*return*/, next(new customError_1.ValidationError("Email and password are both required"))];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, authService_1.authenticateUser)(emailOrUsername, password)];
            case 2:
                _b = _c.sent(), user = _b.user, accessToken = _b.accessToken, refreshToken = _b.refreshToken;
                res.cookie("access_token", accessToken, {
                    httpOnly: true,
                    secure: process.env.Node_ENV === "production",
                    sameSite: "strict",
                    maxAge: 15 * 60 * 1000,
                });
                res.cookie("refresh_token", refreshToken, {
                    httpOnly: true,
                    secure: process.env.Node_ENV == "production",
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                return [2 /*return*/, res.status(200).json({
                        message: "login successfull",
                        user: user,
                        accessToken: accessToken,
                    })];
            case 3:
                error_2 = _c.sent();
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
var refreshAccessToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, newAccessToken, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refreshToken = req.cookies.refresh_token;
                if (!refreshToken) {
                    return [2 /*return*/, next(new customError_1.NotFoundError("No refresh Token Found"))];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, authService_1.refreshAccessTokenLogic)(refreshToken)];
            case 2:
                newAccessToken = _a.sent();
                res.status(200).json({
                    message: "new access token received",
                    accesstoken: newAccessToken,
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.refreshAccessToken = refreshAccessToken;
var logOutUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.clearCookie("access_token", {
                httpOnly: true,
                secure: process.env.Node_ENV === "production",
                sameSite: "strict",
            });
            res.clearCookie("refresh_token", {
                httpOnly: true,
                secure: process.env.Node_ENV === "production",
                sameSite: "strict",
            });
            return [2 /*return*/, res.status(200).json({ message: "Logout Sucessful" })];
        }
        catch (error) {
            next(error);
        }
        return [2 /*return*/];
    });
}); };
exports.logOutUser = logOutUser;
