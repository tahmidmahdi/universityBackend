"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const userValidationSchema = zod_1.default.object({
    password: zod_1.default
        .string({ invalid_type_error: 'Password must be string' })
        .max(20, { message: 'Password can not be more than 20 characters' })
        .optional(),
});
exports.UserValidation = {
    userValidationSchema,
};
