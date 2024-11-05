"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidations = void 0;
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
const createStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20).optional(),
        student: zod_1.z.object({
            name: userNameValidationSchema,
            gender: zod_1.z.enum(['male', 'female']),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email(),
            contactNo: zod_1.z.string().min(1),
            emergencyContactNo: zod_1.z.string().min(1),
            admissionSemester: zod_1.z.string(),
            bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            presentAddress: zod_1.z.string().min(1),
            permanentAddress: zod_1.z.string().min(1),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianValidationSchema,
            // profileImg: z.string().optional(),
        }),
    }),
});
const updateUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().trim().optional(),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
});
const updateGuardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1).optional(),
    fatherOccupation: zod_1.z.string().min(1).optional(),
    fatherContactNo: zod_1.z.string().min(1).optional(),
    motherName: zod_1.z.string().min(1).optional(),
    motherOccupation: zod_1.z.string().min(1).optional(),
    motherContactNo: zod_1.z.string().min(1).optional(),
});
const updateLocalGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1).max(20).optional(),
    occupation: zod_1.z.string().min(1).optional(),
    contactNo: zod_1.z.string().min(1).optional(),
    address: zod_1.z.string().min(1).optional(),
});
const updateStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        student: zod_1.z.object({
            name: updateUserNameValidationSchema,
            gender: zod_1.z.enum(['male', 'female']).optional(),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email().optional(),
            contactNo: zod_1.z.string().min(1).optional(),
            emergencyContactNo: zod_1.z.string().min(1).optional(),
            admissionSemester: zod_1.z.string().optional(),
            bloodGroup: zod_1.z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
                .optional(),
            presentAddress: zod_1.z.string().min(1).optional(),
            permanentAddress: zod_1.z.string().min(1).optional(),
            guardian: updateGuardianValidationSchema,
            localGuardian: updateLocalGuardianValidationSchema,
            profileImg: zod_1.z.string().optional().optional(),
        }),
    }),
});
// Export the Zod schema
exports.studentValidations = {
    createStudentValidationSchema,
    updateStudentValidationSchema,
};
