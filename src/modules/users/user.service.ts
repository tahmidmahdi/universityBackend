import httpStatus from 'http-status'
import { startSession } from 'mongoose'
import config from '../../config'
import AppError from '../../errors/AppError'
import sendImageToCloudinary from '../../utils/sendImageToCloudinary'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'
import { IFaculty } from '../faculties/faculties.interface'
import { Faculty } from '../faculties/faculties.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { IUser } from './user.interface'
import { UserModel } from './user.model'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils'

const createStudentIntoDB = async (
  file: Express.Multer.File,
  payload: TStudent,
  password?: string,
) => {
  // create role
  const userData: Partial<IUser> = {
    role: 'student',
    id: '',
  }

  // year semesterCode 4digitNumber
  // if password not given, use default password
  userData.password = password || (config.default_password as string)
  userData.email = payload.email
  const admissionSemester = await AcademicSemester.findById({
    _id: payload.admissionSemester,
  })

  const session = await startSession()

  try {
    session.startTransaction()
    userData.id = await generateStudentId(
      admissionSemester as IAcademicSemester,
    )
    const imageName = `${userData.id}-${payload.name.firstName}`
    const profileImg = await sendImageToCloudinary(imageName, file.path)
    // create a user: transaction -1
    const response = await UserModel.create([userData], { session })
    if (!response.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id and _id as user
    payload.id = response[0].id
    payload.user = response[0]._id
    payload.profileImg = profileImg

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

const createFacultyIntoDB = async (payload: IFaculty, password?: string) => {
  const facultyData: Partial<IUser> = {
    role: 'faculty',
    id: '',
  }
  facultyData.password = password || (config.default_password as string)
  facultyData.email = payload.email

  const lastFaculty = await generateFacultyId()
  facultyData.id = lastFaculty
  const session = await startSession()
  try {
    session.startTransaction()
    const response = await UserModel.create([facultyData], { session })
    if (!response.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    payload.id = response[0].id
    payload.user = response[0]._id

    const createNewFaculty = await Faculty.create([payload], { session })
    if (!createNewFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }
    await session.commitTransaction()
    await session.endSession()
    return createNewFaculty
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to create faculty')
  }
}

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<IUser> = {}

  //if password is not given , use default password
  userData.password = password || (config.default_password as string)
  userData.email = payload.email
  //set student role
  userData.role = 'admin'
  const session = await startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateAdminId()
    // send image to cloudinary

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session })

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session })

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }

    await session.commitTransaction()
    await session.endSession()

    return newAdmin
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Error in creating admin')
  }
}

const getMeFromDB = async (userId: string, role: string) => {
  if (role === 'student') {
    const response = await Student.findOne({ id: userId }).populate('user')
    return response
  }
  if (role === 'faculty') {
    const response = await Faculty.findOne({ id: userId }).populate('user')
    return response
  }

  const response = await Admin.findOne({ id: userId }).populate('user')
  return response
}

const changeStatusIntoDB = async (id: string, payload: { status: string }) => {
  const { status } = payload
  const response = await UserModel.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  )
  return response
}

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMeFromDB,
  changeStatusIntoDB,
}
