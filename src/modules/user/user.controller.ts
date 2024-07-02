import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, student } = req.body
    // const zodUserValidationSchema = UserValidation.parse(password)
    // console.log(zodUserValidationSchema)

    const response = await UserServices.createStudentIntoDB(
      student,
      password as string,
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully!',
      data: response,
    })
  },
)

export const UserControllers = {
  createStudent,
}
