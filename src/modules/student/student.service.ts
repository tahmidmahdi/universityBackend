import httpStatus from 'http-status'
import { startSession } from 'mongoose'
import AppError from '../../errors/AppError'
import { UserModel } from '../users/user.model'
import { Student } from './student.model'

const getAllStudentsFromDB = async () => {
  const response = await Student.find()
    .populate('user')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
        strictPopulate: false,
      },
    })

  return response
}

const getStudentFromDB = async (id: string) => {
  try {
    const response = Student.findById(id)
      .populate('user')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
          strictPopulate: false,
        },
      })
    return response
  } catch (error) {}
}

const deleteStudentFromDB = async (id: string) => {
  const session = await startSession()

  try {
    session.startTransaction()
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to delete student')
  }
}

const updateStudentFromDB = async (id: string) => {
  const response = await Student.findOneAndUpdate({ id }, { gender: '' })
}

export const StudentServices = {
  getAllStudentsFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
}
