import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { ISemesterRegistration } from './semesterRegistration.interface'
import { SemesterRegistration } from './semesterRegistration.model'

const createSemesterRegistrationIntoDB = async (
  payload: ISemesterRegistration,
) => {
  const academicSemester = payload.academicSemester

  // check if the semester is exist
  const isAcademicSemesterExist = await AcademicSemester.findById({
    _id: academicSemester,
  })

  if (!isAcademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid academic semester')
  }

  //   check is the semester is already registered
  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester,
  })
  if (isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered',
    )
  }

  const result = await SemesterRegistration.create(payload)
  return result
}

const getAllSemesterRegistrationsFromDB = async () => {}

const getSingleSemesterRegistrationFromDB = async () => {}

const updateSemesterRegistrationIntoDB = async () => {}

export const SemesterRegistrationsService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
}
