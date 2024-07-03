"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require("zod");
const createAcademicSemesterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum(['Autumn', 'Summer', 'Fall'], {
            required_error: 'Name is required!',
            invalid_type_error: 'name Type is invalid!',
        }),
        code: zod_1.z.enum(['01', '02', '03'], {
            required_error: 'Code is required',
            invalid_type_error: 'code Type is invalid',
        }),
        year: zod_1.z.string(),
        startMonth: zod_1.z.enum([
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
        ], {
            required_error: 'startMonth is required',
            invalid_type_error: 'startMonth Type is invalid',
        }),
        endMonth: zod_1.z.enum([
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
        ], {
            required_error: 'endMonth is required',
            invalid_type_error: 'endMonth Type is invalid',
        }),
    }),
});
const updateAcademicSemesterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum(['Autumn', 'Summer', 'Fall']).optional(),
        year: zod_1.z.string().optional(),
        code: zod_1.z.enum(['01', '02', '03']).optional(),
        startMonth: zod_1.z
            .enum([
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
        ])
            .optional(),
        endMonth: zod_1.z
            .enum([
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
        ])
            .optional(),
    }),
});
exports.AcademicSemesterValidation = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema,
};
