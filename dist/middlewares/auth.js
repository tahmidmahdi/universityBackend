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
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_model_1 = require("../modules/users/user.model");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth = (...roles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const { userId, role, iat } = decoded;
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
        if (roles && !roles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
