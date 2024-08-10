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

export const FacultyControllers = {
  getAllFaculties,
}
