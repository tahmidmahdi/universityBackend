import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { StudentServices } from './student.service'

const getAllStudents = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await StudentServices.getAllStudentsFromDB()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students are retrieved successfully!',
      data: result,
    })
  },
)

const getStudentById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { studentId } = req.params

    const result = await StudentServices.getStudentFromDB(studentId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is retrieved successfully!',
      data: result,
    })
  },
)

const deleteStudentById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { studentId } = req.params

    const result = await StudentServices.deleteStudentFromDB(studentId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is deleted successfully!',
      data: result,
    })
  },
)

const updateStudentDataByID = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
  } catch (error) {}
}

export const StudentControllers = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
}
