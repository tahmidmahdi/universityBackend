import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'

interface IErrorSource {
  path: string | number
  message: string
}

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500
  const errorSources: Array<IErrorSource> = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ]

  if (error instanceof ZodError) {
  }

  return res.status(statusCode).json({
    success: false,
    message: error.message || 'Something went wrong!',
    // errorSources,
    error,
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
