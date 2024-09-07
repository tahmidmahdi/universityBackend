import { z } from 'zod'
import { Days } from './offeredCourse.constant'

const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string().trim(),
    academicSemester: z.string().trim(),
    academicFaculty: z.string().trim(),
    academicDepartment: z.string().trim(),
    course: z.string().trim(),
    faculty: z.string().trim(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.enum([...Days] as [string, ...string[]]),
    startTime: z.string(),
    endTime: z.string(),
  }),
})

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
}
