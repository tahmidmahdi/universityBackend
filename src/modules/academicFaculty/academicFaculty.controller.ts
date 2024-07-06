import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { Types } from 'mongoose'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicFacultyServices } from './academicFaculty.service'

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const response = await AcademicFacultyServices.createAcademicFacultyIntoDB(
      req.body,
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty is created successfully!',
      data: response,
    })
  },
)

const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const response =
      await AcademicFacultyServices.getAllAcademicFacultiesFromDB()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculties retrieved successfully!',
      data: response,
    })
  },
)

const getAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
  const { facultyId } = req.params
  const response = await AcademicFacultyServices.getAcademicFacultyFromDB(
    facultyId as unknown as Types.ObjectId,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty retrieved successfully!',
    data: response,
  })
})

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params
    const response = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
      facultyId as unknown as Types.ObjectId,
      req.body,
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty updated successfully!',
      data: response,
    })
  },
)

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getAcademicFaculty,
  updateAcademicFaculty,
}
