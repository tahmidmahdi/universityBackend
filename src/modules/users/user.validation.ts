import z from 'zod'
const userValidationSchema = z
  .string({ invalid_type_error: 'Password must be string' })
  .max(20, { message: 'Password can not be more than 20 characters' })
  .trim()
  .optional()

export const UserValidation = userValidationSchema
