"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var roleEnum = ["USER", "ADMIN"];
var userSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: roleEnum, default: "USER" },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
});
var User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
