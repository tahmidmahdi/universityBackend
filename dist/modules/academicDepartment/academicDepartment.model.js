"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartment = void 0;
const mongoose_1 = require("mongoose");
const academicDepartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'academicFaculty',
    },
}, {
    timestamps: true,
});
exports.AcademicDepartment = (0, mongoose_1.model)('academicDepartment', academicDepartmentSchema);
