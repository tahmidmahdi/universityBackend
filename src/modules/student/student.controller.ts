import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { StudentServices } from './student.service'

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students are retrieved successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params

    const result = await StudentServices.getStudentFromDB(studentId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is retrieved successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const deleteStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params

    const result = await StudentServices.deleteStudentFromDB(studentId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is deleted successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

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
