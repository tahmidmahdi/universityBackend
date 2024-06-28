"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const userValidationSchema = zod_1.default.object({
    id: zod_1.default.string(),
    password: zod_1.default
        .string()
        .max(20, { message: 'Password can not be more than 20 characters' }),
    needsPasswordChange: zod_1.default.boolean().optional().default(true),
    role: zod_1.default.enum(['student', 'faculty', 'admin']),
    status: zod_1.default.enum(['in-progress', 'blocked']).default('in-progress'),
    isDeleted: zod_1.default.boolean().optional().default(false),
});
exports.UserValidation = {
    userValidationSchema,
};
