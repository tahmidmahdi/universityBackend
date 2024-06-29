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

const studentValidationSchema = z.object({
  id: z.string().min(1),
  password: z.string().max(30),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  contactNo: z.string().min(1),
  emergencyContactNo: z.string().min(1),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
})

// Export the Zod schema
export const StudentZodSchema = studentValidationSchema
