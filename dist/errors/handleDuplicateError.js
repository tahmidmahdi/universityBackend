"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (error) => {
    const errorMatch = error.message.match(/\"([^\"]+)\"/);
    const extractedMessage = errorMatch && errorMatch[1];
    const errorSources = [
        {
            path: '',
            message: `${extractedMessage} is already exist`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid Id!',
        errorSources,
    };
};
exports.default = handleDuplicateError;
