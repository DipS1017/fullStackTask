"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.NotFoundError = exports.ValidationError = exports.CustomError = void 0;
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, CustomError.prototype);
        return _this;
    }
    return CustomError;
}(Error));
exports.CustomError = CustomError;
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message, property) {
        var _this = _super.call(this, message) || this;
        _this.property = property;
        _this.errorCode = 400;
        _this.errorType = "Validation Error";
        Object.setPrototypeOf(_this, ValidationError.prototype);
        return _this;
    }
    ValidationError.prototype.serializeErrors = function () {
        return [{ message: this.message, property: this.property }];
    };
    return ValidationError;
}(CustomError));
exports.ValidationError = ValidationError;
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message, property) {
        var _this = _super.call(this, message) || this;
        _this.property = property;
        _this.errorCode = 404;
        _this.errorType = "NotFoundError";
        Object.setPrototypeOf(_this, NotFoundError.prototype);
        return _this;
    }
    NotFoundError.prototype.serializeErrors = function () {
        return [{ message: this.message, property: this.property }];
    };
    return NotFoundError;
}(CustomError));
exports.NotFoundError = NotFoundError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(message, property) {
        var _this = _super.call(this, message) || this;
        _this.property = property;
        _this.errorCode = 401;
        _this.errorType = "unauthorized Error";
        Object.setPrototypeOf(_this, UnauthorizedError.prototype);
        return _this;
    }
    UnauthorizedError.prototype.serializeErrors = function () {
        return [{ message: this.message, property: this.property }];
    };
    return UnauthorizedError;
}(CustomError));
exports.UnauthorizedError = UnauthorizedError;
