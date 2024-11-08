import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import AppError from '../../errors/AppError'
import { sendEmail } from '../../utils/sendEmail'
import { UserModel } from '../users/user.model'
import { ILoginUser } from './auth.interface'
import { createToken, verifyToken } from './auth.utils'
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
  const decoded = verifyToken(token, config.jwt_refresh_secret as string)
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

const forgotPassword = async (id: string) => {
  const user = await UserModel.isUserExistsByCustomId(id)
  if (!user || user.isDeleted || user.status === 'blocked') {
    if (!user) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is not found')
    }
    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted')
    }
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked')
  }
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const resetToken = await createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.reset_password_ui_link_expires_in as string,
  )
  const resetLink = `${config.reset_password_ui_link}?id=${user.id}&token=${resetToken}`
  await sendEmail(user.email, resetLink)
  return resetLink
}

const resetPassword = async (
  id: string,
  newPassword: string,
  token: string,
) => {
  const user = await UserModel.isUserExistsByCustomId(id)
  if (!user || user.isDeleted || user.status === 'blocked') {
    if (!user) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is not found')
    }
    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted')
    }
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked')
  }
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload
  const { userId } = decoded
  if (userId !== id) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized')
  }
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await UserModel.findOneAndUpdate(
    { id },
    { password: newHashedPassword, passwordChangedAt: new Date() },
  )
  return null
}

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
}
