import { z } from 'zod'

const academicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic faculty must be string',
      required_error: 'Academic faculty is required',
    }),
  }),
})

const updateDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be string',
        required_error: 'Name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic faculty must be string',
        required_error: 'Academic faculty is required',
      })
      .optional(),
  }),
})

export const AcademicDepartmentValidation = {
  academicDepartmentValidationSchema,
  updateDepartmentValidationSchema,
}
