import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { OfferedCoursesService } from './offeredCourse.service'

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const response = await OfferedCoursesService.createOfferedCourseIntoDB(
    req.body,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Created offered course successfully',
    data: response,
  })
})

const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const response = true
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Created offered course successfully',
    data: response,
  })
})

export const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourses,
}
