"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentZodSchema = void 0;
const zod_1 = require("zod");
const userNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().trim(),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string(),
});
const guardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1),
    fatherOccupation: zod_1.z.string().min(1),
    fatherContactNo: zod_1.z.string().min(1),
    motherName: zod_1.z.string().min(1),
    motherOccupation: zod_1.z.string().min(1),
    motherContactNo: zod_1.z.string().min(1),
});
const localGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1).max(20),
    occupation: zod_1.z.string().min(1),
    contactNo: zod_1.z.string().min(1),
    address: zod_1.z.string().min(1),
});
const studentValidationSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    password: zod_1.z.string().max(30),
    name: userNameValidationSchema,
    gender: zod_1.z.enum(['male', 'female']),
    dateOfBirth: zod_1.z.string().optional(),
    email: zod_1.z.string().email(),
    contactNo: zod_1.z.string().min(1),
    emergencyContactNo: zod_1.z.string().min(1),
    bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: zod_1.z.string().min(1),
    permanentAddress: zod_1.z.string().min(1),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: zod_1.z.string().optional(),
    isActive: zod_1.z.enum(['active', 'blocked']).default('active'),
    isDeleted: zod_1.z.boolean(),
});
// Export the Zod schema
exports.StudentZodSchema = studentValidationSchema;
