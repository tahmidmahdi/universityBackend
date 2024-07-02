import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { Types } from 'mongoose'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices } from './academicSemester.service'

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
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

const getAllAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const response =
      await AcademicSemesterServices.getAllAcademicSemesterFromDB()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semesters retrieved successfully!',
      data: response,
    })
  },
)

const getAcademicSemester = catchAsync(async (req: Request, res: Response) => {
  const { semesterId } = req.params
  const response = await AcademicSemesterServices.getAcademicSemesterFromDB(
    semesterId as unknown as Types.ObjectId,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester retrieved successfully!',
    data: response,
  })
})

const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { semesterId } = req.params
    const response =
      await AcademicSemesterServices.updateAcademicSemesterFromDB(
        semesterId as unknown as Types.ObjectId,
        req.body,
      )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester retrieved successfully!',
      data: response,
    })
  },
)

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getAcademicSemester,
  updateAcademicSemester,
}
