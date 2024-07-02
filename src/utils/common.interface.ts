import { NextFunction, Request, Response } from 'express'

export type IFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void
