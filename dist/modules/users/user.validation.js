"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const user_constant_1 = require("./user.constant");
const userValidationSchema = zod_1.default
    .string({ invalid_type_error: 'Password must be string' })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .trim()
    .optional();
const changeStatusValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        status: zod_1.default.enum([...user_constant_1.USER_STATUS]),
    }),
});
exports.UserValidation = {
    userValidationSchema,
    changeStatusValidationSchema,
};
