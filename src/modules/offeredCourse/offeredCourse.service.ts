import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model'
import { Course } from '../course/course.model'
import { Faculty } from '../faculties/faculties.model'
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model'
import { IOfferedCourse } from './offeredCourse.interface'
import { OfferedCourse } from './offeredCourse.model'

const createOfferedCourseIntoDB = async (payload: IOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
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
  // valid request
  const academicSemester = isSemesterRegistrationExist?.academicSemester
  const response = await OfferedCourse.create({ ...payload, academicSemester })
  return response
}

const getAllOfferedCoursesIntoDB = async () => {}

const getSingleOfferedCourseIntoDB = async () => {}

export const OfferedCoursesService = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesIntoDB,
  getSingleOfferedCourseIntoDB,
}
