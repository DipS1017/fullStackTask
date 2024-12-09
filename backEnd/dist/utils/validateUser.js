"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserId = void 0;
var customError_1 = require("./customError");
var validateUserId = function (req, next) {
    var userId = req.userId;
    if (!userId) {
        next(new customError_1.ValidationError("user not authenticated"));
        throw new Error();
    }
    return userId;
};
exports.validateUserId = validateUserId;
