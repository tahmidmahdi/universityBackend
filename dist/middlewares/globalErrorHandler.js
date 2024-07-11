"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const globalErrorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const errorSources = [
        {
            path: '',
            message: 'Something went wrong!',
        },
    ];
    if (error instanceof zod_1.ZodError) {
    }
    return res.status(statusCode).json({
        success: false,
        message: error.message || 'Something went wrong!',
        // errorSources,
        error,
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
