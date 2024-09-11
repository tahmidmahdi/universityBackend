import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import AppError from '../errors/AppError'
import { TUserRole } from '../modules/users/user.interface'
import { UserModel } from '../modules/users/user.model'
import catchAsync from '../utils/catchAsync'

const auth = (...roles: Array<TUserRole>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload
    const { userId, role, iat } = decoded

    const user = await UserModel.isUserExistsByCustomId(userId)

    if (!user || user.isDeleted || user.status === 'blocked') {
      if (!user) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is not found')
      }
      if (user.isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted')
      }
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked')
    }

    if (
      user.passwordChangedAt &&
      iat &&
      UserModel.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
    }

    if (roles && !roles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
    }

    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
