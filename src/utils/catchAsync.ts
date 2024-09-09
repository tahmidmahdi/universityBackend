import { NextFunction, Request, Response } from 'express'
import { IFunction } from './common.interface'

const catchAsync = (fn: IFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(error => {
      next(error)
    })
  }
}

export default catchAsync
