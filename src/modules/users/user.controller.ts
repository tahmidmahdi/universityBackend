import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, student } = req.body

  const response = await UserServices.createStudentIntoDB(student, password)
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

export const UserControllers = {
  createStudent,
  createFaculty,
}
