import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { UserModel } from '../users/user.model'
import { FacultySearchableFields } from './faculties.constant'
import { IFaculty } from './faculties.interface'
import { Faculty } from './faculties.model'

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const response = await facultyQuery.modelQuery
  return response
}

const getFacultyFromDB = async (id: string) => {
  const response = await Faculty.findOne({ id })
  return response
}

const updateFacultyIntoDB = async (id: string, payload: Partial<IFaculty>) => {
  const { name, ...remainingFacultyData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }
  const response = await Faculty.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return response
}

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )
    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty')
    }

    // get user _id from deletedFaculty
    const userId = deletedFaculty.user

    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedFaculty
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to delete faculty')
  }
}

export const FacultyServices = {
  getAllFacultiesFromDB,
  getFacultyFromDB,
  updateFacultyIntoDB,
  deleteStudentFromDB,
}
