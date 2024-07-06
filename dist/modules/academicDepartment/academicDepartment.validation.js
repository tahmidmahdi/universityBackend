"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentValidation = void 0;
const zod_1 = require("zod");
const academicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: 'Name must be string',
            required_error: 'Name is required',
        }),
        academicFaculty: zod_1.z.string({
            invalid_type_error: 'Academic faculty must be string',
            required_error: 'Academic faculty is required',
        }),
    }),
});
const updateDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: 'Name must be string',
            required_error: 'Name is required',
        })
            .optional(),
        academicFaculty: zod_1.z
            .string({
            invalid_type_error: 'Academic faculty must be string',
            required_error: 'Academic faculty is required',
        })
            .optional(),
    }),
});
exports.AcademicDepartmentValidation = {
    academicDepartmentValidationSchema,
    updateDepartmentValidationSchema,
};
