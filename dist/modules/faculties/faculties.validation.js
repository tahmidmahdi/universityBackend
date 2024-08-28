"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyValidation = void 0;
const zod_1 = require("zod");
const facultyNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string({
        invalid_type_error: 'First name must be string',
        required_error: 'First name must be required',
    })
        .trim(),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z
        .string({
        invalid_type_error: 'Last name must be string',
        required_error: 'Last name must be required',
    })
        .trim(),
});
const createFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20).optional(),
        faculty: zod_1.z.object({
            name: facultyNameValidationSchema,
            gender: zod_1.z.enum(['male', 'female']),
            dateOfBirth: zod_1.z
                .string({
                invalid_type_error: 'Date of birth must be string',
                required_error: 'Date of birth is required',
            })
                .date(),
            email: zod_1.z
                .string({
                invalid_type_error: 'Email must be string',
                required_error: 'Email is required',
            })
                .trim(),
            contactNo: zod_1.z.string().min(11).optional(),
            emergencyContactNo: zod_1.z.string().min(11).optional(),
            presentAddress: zod_1.z.string().optional(),
            academicDepartment: zod_1.z.string(),
            permanentAddress: zod_1.z.string().optional(),
            profileImg: zod_1.z.string().optional(),
        }),
    }),
});
exports.facultyValidation = {
    createFacultyValidationSchema,
};
