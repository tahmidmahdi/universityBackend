import { NextFunction, Request, Response } from 'express'

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(400).json({
    success: false,
    message: error.message || 'Something went wrong!',
    error,
  })
}

export default globalErrorHandler
