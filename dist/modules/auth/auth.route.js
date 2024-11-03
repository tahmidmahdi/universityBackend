"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_constant_1 = require("../users/user.constant");
const auth_controller_1 = require("./auth.controller");
const auth_validations_1 = require("./auth.validations");
const router = express_1.default.Router();
router
    .post('/login', (0, validateRequest_1.default)(auth_validations_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthController.loginUser)
    .post('/change-password', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), (0, validateRequest_1.default)(auth_validations_1.AuthValidation.changePasswordValidationSchema), auth_controller_1.AuthController.changePassword)
    .post('/refresh-token', (0, validateRequest_1.default)(auth_validations_1.AuthValidation.refreshTokenValidationSchema), auth_controller_1.AuthController.refreshToken)
    .post('/forgot-password', (0, validateRequest_1.default)(auth_validations_1.AuthValidation.forgotPasswordValidationSchema), auth_controller_1.AuthController.forgotPassword)
    .post('/reset-password', (0, validateRequest_1.default)(auth_validations_1.AuthValidation.resetPasswordValidationSchema), auth_controller_1.AuthController.resetPassword);
exports.AuthRoutes = router;
