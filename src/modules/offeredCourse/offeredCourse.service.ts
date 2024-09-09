import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model'
import { Course } from '../course/course.model'
import { Faculty } from '../faculties/faculties.model'
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model'
import { IOfferedCourse } from './offeredCourse.interface'
import { OfferedCourse } from './offeredCourse.model'
import { hasTimeConflict } from './offeredCourse.utils'

const createOfferedCourseIntoDB = async (payload: IOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload
  // check if the semester registration id exist!
  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration)
  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found')
  }
  const isAcademicFacultyExist = await AcademicFaculty.findById(academicFaculty)
  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty not found')
  }
  const isAcademicDepartmentExist =
    await AcademicDepartment.findById(academicDepartment)
  if (!isAcademicDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found')
  }
  const isCourseExist = await Course.findById(course)
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found')
  }
  const isFacultyExist = await Faculty.findById(faculty)
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found')
  }
  // check if the department belong to the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  })

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This academicDepartment:${isAcademicDepartmentExist.name} is not belong to this academicFaculty:${isAcademicFacultyExist.name}`,
    )
  }

  // check if the same offered course same section in same registered semester exist
  const isSameOfferedCourseWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    })

  if (isSameOfferedCourseWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Offered course with same section is already exist`,
    )
  }

  // get the schedules of the faculty
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')
  const newScheduleTime = {
    days,
    startTime,
    endTime,
  }

  if (hasTimeConflict(assignedSchedules, newScheduleTime)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This faculty is not available at that time! Choose other time or day',
    )
  }
  // valid request
  const academicSemester = isSemesterRegistrationExist?.academicSemester
  const response = await OfferedCourse.create({ ...payload, academicSemester })
  return response
}

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields()

  const response = await offeredCourseQuery.modelQuery
  return response
}

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<IOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload

  const isOfferedCourseExist = await OfferedCourse.findById(id)
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found')
  }

  const isFacultyExist = await Faculty.findById(faculty)
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found')
  }

  const semesterRegistration = isOfferedCourseExist.semesterRegistration

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration)

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You can not update this offered course as it is not upcoming',
    )
  }

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')

  const newScheduleTime = {
    days,
    startTime,
    endTime,
  }

  if (hasTimeConflict(assignedSchedules, newScheduleTime)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This faculty is not available at that time! Choose other time or day',
    )
  }
  const response = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return response
}

const getSingleOfferedCourseFromDB = async (id: string) => {
  const offeredCourse = await OfferedCourse.findById(id)

  if (!offeredCourse) {
    throw new AppError(404, 'Offered Course not found')
  }

  return offeredCourse
}

const deleteOfferedCourseFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  const isOfferedCourseExists = await OfferedCourse.findById(id)

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found')
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration).select('status')

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
    )
  }

  const result = await OfferedCourse.findByIdAndDelete(id)

  return result
}

export const OfferedCoursesService = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  updateOfferedCourseIntoDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
}
