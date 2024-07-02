import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices } from './academicSemester.service'

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { academicSemester } = req.body
    const response =
      await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is created successfully!',
      data: response,
    })
  },
)

export const AcademicSemesterControllers = {
  createAcademicSemester,
}
