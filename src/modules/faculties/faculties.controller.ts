import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { FacultyServices } from './faculties.service'

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const response = await FacultyServices.getAllFacultiesFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    data: response,
  })
})

const getFacultyById = catchAsync(async (req: Request, res: Response) => {
  const { facultyId } = req.params
  const response = await FacultyServices.getFacultyFromDB(facultyId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully get faculty',
    data: response,
  })
})

const updateFacultyById = catchAsync(async (req: Request, res: Response) => {
  const { facultyId } = req.params
  const { faculty } = req.body
  const response = await FacultyServices.updateFacultyIntoDB(facultyId, faculty)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated faculty',
    data: response,
  })
})

export const FacultyControllers = {
  getAllFaculties,
  getFacultyById,
  updateFacultyById,
}
