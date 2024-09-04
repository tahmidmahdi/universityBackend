import httpStatus from 'http-status'
import mongoose, { Types } from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { courseSearchableFields } from './ course.constant'
import { ICourse } from './course.interface'
import { Course } from './course.model'

const createCourseIntoDB = async (payload: ICourse) => {
  const response = await Course.create(payload)
  return response
}

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .paginate()
    .filter()
    .sort()
    .fields()

  const response = await courseQuery.modelQuery
  return response
}

const getCourseFromDB = async (id: Types.ObjectId) => {
  const response = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  )
  return response
}

const updateCourseIntoDB = async (
  id: Types.ObjectId,
  payload: Partial<ICourse>,
) => {
  const { preRequisiteCourses, ...remaining } = payload

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // basic course info update
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      remaining,
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
    }

    // check if there is any pre requisite courses
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out deleted fields
      const deletedPreRequisites = preRequisiteCourses
        .filter(course => {
          if (course.course) {
            return course.isDeleted
          }
        })
        .map(course => course.course)

      // deleted pre requisite courses
      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        { new: true, runValidators: true, session },
      )

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete course')
      }

      // filter out new pre requisites
      const newPreRequisites = preRequisiteCourses.filter(course => {
        if (course.course) {
          return !course.isDeleted
        }
      })

      // add new pre requisites
      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        { new: true, runValidators: true, session },
      )
      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete course')
      }
    }

    const response = Course.findById(id).populate('preRequisiteCourses.course')
    await session.commitTransaction()
    await session.endSession()
    return response
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong')
  }
}

const deleteCourseFromDB = async (id: Types.ObjectId) => {
  const response = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return response
}

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
}
