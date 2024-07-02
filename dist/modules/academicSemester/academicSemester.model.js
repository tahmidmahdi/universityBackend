"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemester = void 0;
const mongoose_1 = require("mongoose");
const academicSemesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: ['Autumn', 'Summer', 'Fall'],
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        enum: ['01', '02', '03'],
        required: true,
    },
    startMonth: {
        type: String,
        enum: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        required: true,
    },
    endMonth: {
        type: String,
        enum: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        required: true,
    },
}, {
    timestamps: true,
});
exports.AcademicSemester = (0, mongoose_1.model)('academicSemester', academicSemesterSchema);
