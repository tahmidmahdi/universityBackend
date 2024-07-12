"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const globalErrorHandler = (error, req, res, next) => {
    var _a;
    let statusCode = error.statusCode || 500;
    let message = 'Something went wrong!';
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong!',
        },
    ];
    const errorSourceMapper = (_a = error === null || error === void 0 ? void 0 : error.issues) === null || _a === void 0 ? void 0 : _a.map((issue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    const handleZodError = (err) => {
        statusCode = 400;
        return {
            statusCode,
            message: 'Validation error',
            errorSourceMapper,
        };
    };
    if (error instanceof zod_1.ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources =
            simplifiedError.errorSourceMapper;
    }
    return res.status(statusCode).json({
        success: false,
        message: message,
        errorSources,
        stack: config_1.default.NODE_ENV === 'development' ? error === null || error === void 0 ? void 0 : error.stack : null,
    });
};
exports.default = globalErrorHandler;
// pattern
/*
  success
  message
  errorSources: [
    path: "",
    message: ""
  ],
  stack
*/
