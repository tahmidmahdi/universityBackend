import { z } from 'zod'

const userNameValidationSchema = z.object({
  firstName: z.string().trim(),
  middleName: z.string().optional(),
  lastName: z.string(),
})

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
})

const localGuardianValidationSchema = z.object({
  name: z.string().trim().min(1).max(20),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
})

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string().min(1),
      emergencyContactNo: z.string().min(1),
      admissionSemester: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      // profileImg: z.string().optional(),
    }),
  }),
})

const updateUserNameValidationSchema = z.object({
  firstName: z.string().trim().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
})

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().min(1).optional(),
  fatherOccupation: z.string().min(1).optional(),
  fatherContactNo: z.string().min(1).optional(),
  motherName: z.string().min(1).optional(),
  motherOccupation: z.string().min(1).optional(),
  motherContactNo: z.string().min(1).optional(),
})

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().trim().min(1).max(20).optional(),
  occupation: z.string().min(1).optional(),
  contactNo: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
})

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().min(1).optional(),
      emergencyContactNo: z.string().min(1).optional(),
      admissionSemester: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1).optional(),
      permanentAddress: z.string().min(1).optional(),
      guardian: updateGuardianValidationSchema,
      localGuardian: updateLocalGuardianValidationSchema,
      profileImg: z.string().optional().optional(),
    }),
  }),
})

// Export the Zod schema
export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
}
