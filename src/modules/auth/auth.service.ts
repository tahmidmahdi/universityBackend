import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import AppError from '../../errors/AppError'
import { UserModel } from '../users/user.model'
import { ILoginUser } from './auth.interface'
import { createToken } from './auth.utils'
const loginUser = async (payload: ILoginUser) => {
  // check if the user exist
  const user = await UserModel.isUserExistsByCustomId(payload.id)

  if (!user || user.isDeleted || user.status === 'blocked') {
    if (!user) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is not found')
    }
    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted')
    }
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked')
  }
  // checking is the password is correct

  const isPasswordMatched = await UserModel.isPasswordMatched(
    payload.password,
    user.password as string,
  )
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password doesn't matched")
  }
  // access granted, send AccessToken, RefreshToken
  // create token and send to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }
  const accessToken = await createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )
  const refreshToken = await createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )
  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
  }
}

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await UserModel.isUserExistsByCustomId(userData.userId)
  if (!user || user.isDeleted || user.status === 'blocked') {
    if (!user) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is not found')
    }
    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted')
    }
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked')
  }

  // checking is the password is correct

  const isPasswordMatched = await UserModel.isPasswordMatched(
    payload.oldPassword,
    user.password as string,
  )

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password doesn't matched")
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await UserModel.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  )
  return null
}

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload
  const { userId, iat } = decoded

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

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const accessToken = await createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  return {
    accessToken,
  }
}

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
}
