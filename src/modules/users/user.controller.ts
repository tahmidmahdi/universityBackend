import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, student } = req.body
  const response = await UserServices.createStudentIntoDB(
    req.file as Express.Multer.File,
    student,
    password,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully!',
    data: response,
  })
})

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { password, faculty } = req.body
  const response = await UserServices.createFacultyIntoDB(faculty, password)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: response,
  })
})

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body
  const result = await UserServices.createAdminIntoDB(password, adminData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  })
})

const getMe = catchAsync(async (req: Request, res: Response) => {
  const { userId, role } = req.user as JwtPayload
  const result = await UserServices.getMeFromDB(userId, role)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User data fetched successfully',
    data: result,
  })
})

const changeStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await UserServices.changeStatusIntoDB(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status changed successfully',
    data: result,
  })
})

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
}
