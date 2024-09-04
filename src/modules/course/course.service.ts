import { Types } from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
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
  // basic course info update
  const updateBasicCourseInfo = await Course.findByIdAndUpdate(id, remaining, {
    new: true,
    runValidators: true,
  })

  // check if there is any pre requisite courses
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    // filter out deleted fields
    const deletedPreRequisites = preRequisiteCourses
      .filter(course => course.course && course.isDeleted)
      .map(course => course.course)

    const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } },
    })

    // filter out new pre requisites
    const newPreRequisites = preRequisiteCourses.filter(
      course => course.isDeleted && !course.isDeleted,
    )
    
    const newPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
        
    })
  }
  return updateBasicCourseInfo
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
