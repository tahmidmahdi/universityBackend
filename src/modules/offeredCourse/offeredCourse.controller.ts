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
  const response = await OfferedCoursesService.getAllOfferedCoursesFromDB(
    req.query,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Created offered course successfully',
    data: response,
  })
})

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const response = await OfferedCoursesService.updateOfferedCourseIntoDB(
    id,
    req.body,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Offered course updated successfully',
    data: response,
  })
})

const getSingleOfferedCourses = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await OfferedCoursesService.getSingleOfferedCourseFromDB(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourse fetched successfully',
      data: result,
    })
  },
)

const deleteOfferedCourseFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await OfferedCoursesService.deleteOfferedCourseFromDB(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourse deleted successfully',
      data: result,
    })
  },
)

export const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourses,
  updateOfferedCourse,
  getSingleOfferedCourses,
  deleteOfferedCourseFromDB,
}
