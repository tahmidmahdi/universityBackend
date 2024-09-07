"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseValidations = void 0;
const zod_1 = require("zod");
const offeredCourse_constant_1 = require("./offeredCourse.constant");
const createOfferedCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        semesterRegistration: zod_1.z.string().trim(),
        academicSemester: zod_1.z.string().trim(),
        academicFaculty: zod_1.z.string().trim(),
        academicDepartment: zod_1.z.string().trim(),
        course: zod_1.z.string().trim(),
        faculty: zod_1.z.string().trim(),
        maxCapacity: zod_1.z.number(),
        section: zod_1.z.number(),
        days: zod_1.z.enum([...offeredCourse_constant_1.Days]),
        startTime: zod_1.z.string(),
        endTime: zod_1.z.string(),
    }),
});
exports.OfferedCourseValidations = {
    createOfferedCourseValidationSchema,
};
