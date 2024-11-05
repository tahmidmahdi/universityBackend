import z from 'zod'
import { USER_STATUS } from './user.constant'
const userValidationSchema = z
  .string({ invalid_type_error: 'Password must be string' })
  .max(20, { message: 'Password can not be more than 20 characters' })
  .trim()
  .optional()

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...USER_STATUS] as [string, ...string[]]),
  }),
})

export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
}
