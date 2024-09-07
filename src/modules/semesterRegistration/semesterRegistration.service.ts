import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { SemesterRegistrationStatusType } from './semesterRegistration.constant'
import { ISemesterRegistration } from './semesterRegistration.interface'
import { SemesterRegistration } from './semesterRegistration.model'

const createSemesterRegistrationIntoDB = async (
  payload: ISemesterRegistration,
) => {
  const academicSemester = payload.academicSemester
  // check if their any registered semesters status with upcoming or ongoing
  const isTheirAnyUpcomingOrOngoing = await SemesterRegistration.findOne({
    $or: [
      {
        status: SemesterRegistrationStatusType.UPCOMING,
      },
      {
        status: SemesterRegistrationStatusType.ONGOING,
      },
    ],
  })

  if (isTheirAnyUpcomingOrOngoing) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Their is already an ${isTheirAnyUpcomingOrOngoing.status} registered semester`,
    )
  }

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

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const response = await semesterRegistrationQuery.modelQuery
  return response
}

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const response =
    await SemesterRegistration.findById(id).populate('academicSemester')
  return response
}

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<ISemesterRegistration>,
) => {
  // check is the registered semester is exists
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id)
  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.CONFLICT, 'This semester is not found')
  }
  // if the requested semester registration is ended, we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExist?.status
  const requestedStatus = payload?.status
  if (currentSemesterStatus === SemesterRegistrationStatusType.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    )
  }

  // UPCOMING -> ONGOING -> ENDED
  if (
    currentSemesterStatus === SemesterRegistrationStatusType.UPCOMING &&
    requestedStatus === SemesterRegistrationStatusType.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    )
  }

  if (
    currentSemesterStatus === SemesterRegistrationStatusType.ONGOING &&
    requestedStatus === SemesterRegistrationStatusType.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    )
  }

  const response = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return response
}

export const SemesterRegistrationsService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
}
