"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (error) => {
    const errorSources = Object.values(error.errors).map((value) => {
        return {
            path: value.path,
            message: value.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation error!',
        errorSources,
    };
};
exports.default = handleValidationError;
