import { z } from 'zod'

const createAcademicValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be string',
    }),
  }),
})

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be string',
    }),
  }),
})

export const AcademicFacultyValidation = {
  createAcademicValidationSchema,
  updateAcademicSemesterValidationSchema,
}
