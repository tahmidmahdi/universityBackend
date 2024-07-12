import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { StudentServices } from './student.service'

const getAllStudents = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await StudentServices.getAllStudentsFromDB(req.query)
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

const updateStudentDataByID = catchAsync(
  async (req: Request, res: Response) => {
    const { studentId } = req.params
    const { student } = req.body
    const response = await StudentServices.updateStudentFromDB(
      studentId,
      student,
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student data updated successfully',
      data: response,
    })
  },
)

export const StudentControllers = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
  updateStudentDataByID,
}
