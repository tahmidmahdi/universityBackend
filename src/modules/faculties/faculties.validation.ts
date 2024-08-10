import { z } from 'zod'

const facultyNameValidationSchema = z.object({
  firstName: z
    .string({
      invalid_type_error: 'First name must be string',
      required_error: 'First name must be required',
    })
    .trim(),
  middleName: z.string().optional(),
  lastName: z
    .string({
      invalid_type_error: 'Last name must be string',
      required_error: 'Last name must be required',
    })
    .trim(),
})

const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    faculty: z.object({
      name: facultyNameValidationSchema,
      gender: z.enum(['male', 'female']),
      role: z.string({
        invalid_type_error: 'Role must be string',
        required_error: 'Role is required',
      }),
      designation: z.string({
        invalid_type_error: 'Designation must be string',
        required_error: 'Designation is required',
      }),
      dateOfBirth: z
        .string({
          invalid_type_error: 'Date of birth must be string',
          required_error: 'Date of birth is required',
        })
        .date(),
      email: z
        .string({
          invalid_type_error: 'Email must be string',
          required_error: 'Email is required',
        })
        .trim(),
      contactNo: z.string().min(11).optional(),
      emergencyContactNo: z.string().min(11).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
})

export const facultyValidation = {
  createFacultyValidationSchema,
}
