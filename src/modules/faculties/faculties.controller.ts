import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { FacultyServices } from './faculties.service'

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  console.log('test', req.user)

  const response = await FacultyServices.getAllFacultiesFromDB(req.query)
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

const deleteFacultyById = catchAsync(async (req: Request, res: Response) => {
  const { facultyId } = req.params
  const response = await FacultyServices.deleteStudentFromDB(facultyId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully deleted faculty',
    data: response,
  })
})

export const FacultyControllers = {
  getAllFaculties,
  getFacultyById,
  updateFacultyById,
  deleteFacultyById,
}
