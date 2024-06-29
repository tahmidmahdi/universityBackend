"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (error, req, res, next) => {
    return res.status(400).json({
        success: false,
        message: error.message || 'Something went wrong!',
        error,
    });
};
exports.default = globalErrorHandler;
