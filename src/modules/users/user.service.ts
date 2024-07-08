import httpStatus from 'http-status'
import { startSession } from 'mongoose'
import config from '../../config'
import AppError from '../../errors/AppError'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { IUser } from './user.interface'
import { UserModel } from './user.model'
import { generateStudentId } from './user.utils'

const createStudentIntoDB = async (payload: TStudent, password?: string) => {
  // create role
  const userData: Partial<IUser> = {
    role: 'student',
    id: '',
  }

  // year semesterCode 4digitNumber
  // if password not given, use default password
  userData.password = password || (config.default_password as string)

  const admissionSemester = await AcademicSemester.findById({
    _id: payload.admissionSemester,
  })

  const session = await startSession()

  try {
    session.startTransaction()
    userData.id = await generateStudentId(
      admissionSemester as IAcademicSemester,
    )
    // create a user: transaction -1
    const response = await UserModel.create([userData], { session })
    if (!response.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id and _id as user
    payload.id = response[0].id
    payload.user = response[0]._id

    // create a student: transaction -2
    const newStudent = await Student.create([payload], { session })
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    await session.commitTransaction()
    await session.endSession()
    return newStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to create student')
  }
}

export const UserServices = {
  createStudentIntoDB,
}
