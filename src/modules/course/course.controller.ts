import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { Types } from 'mongoose'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { CourseServices } from './course.service'

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const response = await CourseServices.createCourseIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully!',
    data: response,
  })
})

const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const response = await CourseServices.getAllCoursesFromDB(req.params)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses retrieved successfully!',
    data: response,
  })
})

const getCourse = catchAsync(async (req: Request, res: Response) => {
  const { id: courseId } = req.params
  const response = await CourseServices.getCourseFromDB(
    courseId as unknown as Types.ObjectId,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course retrieved successfully!',
    data: response,
  })
})

const updateCourse = catchAsync(async (req, res) => {
  const { id: courseId } = req.params
  const response = await CourseServices.updateCourseIntoDB(
    courseId as unknown as Types.ObjectId,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully!',
    data: response,
  })
})

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { id: courseId } = req.params
  const { faculties } = req.body
  const response = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId as unknown as Types.ObjectId,
    faculties,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties assigned successfully!',
    data: response,
  })
})

const removeFacultiesWithCourse = catchAsync(async (req, res) => {
  console.log('in controller')

  const { id: courseId } = req.params
  const { faculties } = req.body
  const response = await CourseServices.removeFacultiesWithCourseIntoDB(
    courseId as unknown as Types.ObjectId,
    faculties,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties removed successfully!',
    data: response,
  })
})

const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const { id: courseId } = req.params
  const response = await CourseServices.deleteCourseFromDB(
    courseId as unknown as Types.ObjectId,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted successfully!',
    data: response,
  })
})

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesWithCourse,
  deleteCourse,
}
