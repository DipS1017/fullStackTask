"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var customError_1 = require("../utils/customError");
var errorHandler = function (err, req, res, next) {
    if (err instanceof customError_1.CustomError) {
        return res.status(err.errorCode).json({
            statusCode: err.errorCode,
            errorType: err.errorType,
            errors: err.serializeErrors(),
        });
    }
    //handle unkown errors
    console.error("Something went wrong", err);
    return res.status(500).json({ message: "Something went wrong." });
};
exports.errorHandler = errorHandler;
