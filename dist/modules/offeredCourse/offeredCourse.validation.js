"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseValidations = void 0;
const zod_1 = require("zod");
const offeredCourse_constant_1 = require("./offeredCourse.constant");
const createOfferedCourseValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        semesterRegistration: zod_1.z.string().trim(),
        academicFaculty: zod_1.z.string().trim(),
        academicDepartment: zod_1.z.string().trim(),
        course: zod_1.z.string().trim(),
        faculty: zod_1.z.string().trim(),
        maxCapacity: zod_1.z.number(),
        section: zod_1.z.number(),
        days: zod_1.z.array(zod_1.z.enum([...offeredCourse_constant_1.Days])),
        startTime: zod_1.z.string().refine(time => {
            const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            return regex.test(time);
        }, {
            message: "Invalid time formate, expected 'HH:MM' in 24 hours formate",
        }), // HH:MM 00-23 00-59
        endTime: zod_1.z.string().refine(time => {
            const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            return regex.test(time);
        }, {
            message: "Invalid time formate, expected 'HH:MM' in 24 hours formate",
        }), // HH:MM 00-23 00-59
    })
        .refine(body => {
        // startTime : 10:30 => 1996-01-01T10:30
        // endTime: 12:30 => 1996-01-01T12:30
        const start = new Date(`1996-01-01T${body.startTime}:00`);
        const end = new Date(`1996-01-01T${body.endTime}:00`);
        return end > start;
    }, {
        message: 'Start time should be before end time',
    }),
});
const updateOfferedCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        faculty: zod_1.z.string().trim().optional(),
        maxCapacity: zod_1.z.number().optional(),
        days: zod_1.z.enum([...offeredCourse_constant_1.Days]).optional(),
        startTime: zod_1.z.string().optional(),
        endTime: zod_1.z.string().optional(),
    }),
});
exports.OfferedCourseValidations = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema,
};
