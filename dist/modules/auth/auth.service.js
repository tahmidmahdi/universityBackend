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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const sendEmail_1 = require("../../utils/sendEmail");
const user_model_1 = require("../users/user.model");
const auth_utils_1 = require("./auth.utils");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the user exist
    const user = yield user_model_1.UserModel.isUserExistsByCustomId(payload.id);
    if (!user || user.isDeleted || user.status === 'blocked') {
        if (!user) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is not found');
        }
        if (user.isDeleted) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted');
        }
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked');
    }
    // checking is the password is correct
    const isPasswordMatched = yield user_model_1.UserModel.isPasswordMatched(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password doesn't matched");
    }
    // access granted, send AccessToken, RefreshToken
    // create token and send to the client
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const accessToken = yield (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = yield (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user.needsPasswordChange,
    };
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.isUserExistsByCustomId(userData.userId);
    if (!user || user.isDeleted || user.status === 'blocked') {
        if (!user) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is not found');
        }
        if (user.isDeleted) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted');
        }
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked');
    }
    // checking is the password is correct
    const isPasswordMatched = yield user_model_1.UserModel.isPasswordMatched(payload.oldPassword, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password doesn't matched");
    }
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.UserModel.findOneAndUpdate({
        id: userData.userId,
        role: userData.role,
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    });
    return null;
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt_refresh_secret);
    const { userId, iat } = decoded;
    const user = yield user_model_1.UserModel.isUserExistsByCustomId(userId);
    if (!user || user.isDeleted || user.status === 'blocked') {
        if (!user) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is not found');
        }
        if (user.isDeleted) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted');
        }
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked');
    }
    if (user.passwordChangedAt &&
        iat &&
        user_model_1.UserModel.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
    }
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const accessToken = yield (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
const forgotPassword = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.isUserExistsByCustomId(id);
    if (!user || user.isDeleted || user.status === 'blocked') {
        if (!user) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is not found');
        }
        if (user.isDeleted) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted');
        }
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked');
    }
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const resetToken = yield (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.reset_password_ui_link_expires_in);
    const resetLink = `${config_1.default.reset_password_ui_link}?id=${user.id}&token=${resetToken}`;
    yield (0, sendEmail_1.sendEmail)(user.email, resetLink);
    return resetLink;
});
const resetPassword = (id, newPassword, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.isUserExistsByCustomId(id);
    if (!user || user.isDeleted || user.status === 'blocked') {
        if (!user) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is not found');
        }
        if (user.isDeleted) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted');
        }
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked');
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    const { userId } = decoded;
    if (userId !== id) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized');
    }
    const newHashedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.UserModel.findOneAndUpdate({ id }, { password: newHashedPassword, passwordChangedAt: new Date() });
    return null;
});
exports.AuthServices = {
    loginUser,
    changePassword,
    refreshToken,
    forgotPassword,
    resetPassword,
};
