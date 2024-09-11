import { Request, Response } from 'express'
import httpStatus from 'http-status'
import config from '../../config'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const response = await AuthServices.loginUser(req.body)
  const { accessToken, refreshToken, needsPasswordChange } = response
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  })
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully',
    data: {
      accessToken,
      needsPasswordChange,
    },
  })
})

const changePassword = catchAsync(async (req: Request, res: Response) => {
  // const response = await AuthServices.changePassword()
  const response = await AuthServices.changePassword(req.user, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: response,
  })
})

export const AuthController = {
  loginUser,
  changePassword,
}
