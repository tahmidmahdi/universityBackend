import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (error) {
    next(error)
  }
}

export const UserControllers = {
  createStudent,
}
