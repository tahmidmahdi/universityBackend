import { IOfferedCourse } from './offeredCourse.interface'
import { OfferedCourse } from './offeredCourse.model'

const createOfferedCourseIntoDB = async (payload: IOfferedCourse) => {
  const response = await OfferedCourse.create(payload)
  return response
}

const getAllOfferedCoursesIntoDB = async () => {}

const getSingleOfferedCourseIntoDB = async () => {}

export const OfferedCoursesService = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesIntoDB,
  getSingleOfferedCourseIntoDB,
}
