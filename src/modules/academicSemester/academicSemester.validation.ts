import { z } from 'zod'

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Name is required!',
      invalid_type_error: 'name Type is invalid!',
    }),
    code: z.enum(['01', '02', '03'], {
      required_error: 'Code is required',
      invalid_type_error: 'code Type is invalid',
    }),
    year: z.string(),
    startMonth: z.enum(
      [
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
      ],
      {
        required_error: 'startMonth is required',
        invalid_type_error: 'startMonth Type is invalid',
      },
    ),
    endMonth: z.enum(
      [
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
      ],
      {
        required_error: 'endMonth is required',
        invalid_type_error: 'endMonth Type is invalid',
      },
    ),
  }),
})

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(['Autumn', 'Summer', 'Fall']).optional(),
    year: z.string().optional(),
    code: z.enum(['01', '02', '03']).optional(),
    startMonth: z
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
    endMonth: z
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
})

export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
}
