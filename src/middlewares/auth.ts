import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import AppError from '../errors/AppError'
import { TUserRole } from '../modules/users/user.interface'
import catchAsync from '../utils/catchAsync'

const auth = (...roles: Array<TUserRole>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
    }

    // verify token
    jwt.verify(token, config.jwt_access_secret as string, (error, decoded) => {
      if (error) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }

      if (roles && !roles.includes((decoded as JwtPayload)?.role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }
      req.user = decoded as JwtPayload
      next()
    })
  })
}

export default auth
