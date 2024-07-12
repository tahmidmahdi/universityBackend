import { ZodError, ZodIssue } from 'zod'
import { IErrorSource } from '../interface/error'

const handleZodError = (err: ZodError) => {
  const errorSourceMapper: Array<IErrorSource> = err?.issues?.map(
    (issue: ZodIssue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      }
    },
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation error',
    errorSourceMapper,
  }
}

export default handleZodError
