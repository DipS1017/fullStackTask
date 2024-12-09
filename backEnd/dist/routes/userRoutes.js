"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = require("../controllers/authController");
var userController_1 = require("../controllers/userController");
var router = express_1.default.Router();
router.post("/signup", authController_1.createUser);
router.get("/checkEmail", userController_1.checkEmailAvailability);
router.get("/checkUserName", userController_1.checkUsernameAvailability);
exports.default = router;
