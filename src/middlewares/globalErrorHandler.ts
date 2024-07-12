import { ErrorRequestHandler } from 'express'
import { ZodError, ZodIssue } from 'zod'
import config from '../config'
import { IErrorSource } from '../interface/error'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500
  let message = 'Something went wrong!'

  let errorSources: Array<IErrorSource> = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ]

  const errorSourceMapper: IErrorSource = error?.issues?.map(
    (issue: ZodIssue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      }
    },
  )

  const handleZodError = (err: ZodError) => {
    statusCode = 400
    return {
      statusCode,
      message: 'Validation error',
      errorSourceMapper,
    }
  }

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources =
      simplifiedError.errorSourceMapper as unknown as Array<IErrorSource>
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  })
}

export default globalErrorHandler

// pattern
/*
  success
  message
  errorSources: [
    path: "",
    message: ""
  ],
  stack
*/
