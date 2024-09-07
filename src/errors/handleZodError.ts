import { ZodError, ZodIssue } from 'zod'
import { IErrorSource, IGenericError } from '../interface/error'

const handleZodError = (err: ZodError): IGenericError => {
  const errorSources: Array<IErrorSource> = err.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      }
    },
  )

  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  }
}

export default handleZodError
