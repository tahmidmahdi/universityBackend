import { z } from 'zod'
import { Days } from './offeredCourse.constant'

const timeStringSchema = z.string().refine(
  time => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    return regex.test(time)
  },
  {
    message: "Invalid time formate, expected 'HH:MM' in 24 hours formate",
  },
) // HH:MM 0

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string().trim(),
      academicFaculty: z.string().trim(),
      academicDepartment: z.string().trim(),
      course: z.string().trim(),
      faculty: z.string().trim(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      body => {
        // startTime : 10:30 => 1996-01-01T10:30
        // endTime: 12:30 => 1996-01-01T12:30
        const start = new Date(`1996-01-01T${body.startTime}:00`)
        const end = new Date(`1996-01-01T${body.endTime}:00`)
        return end > start
      },
      {
        message: 'Start time should be before end time',
      },
    ),
})

const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string().trim(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      body => {
        // startTime : 10:30 => 1996-01-01T10:30
        // endTime: 12:30 => 1996-01-01T12:30
        const start = new Date(`1996-01-01T${body.startTime}:00`)
        const end = new Date(`1996-01-01T${body.endTime}:00`)
        return end > start
      },
      {
        message: 'Start time should be before end time',
      },
    ),
})

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
}
