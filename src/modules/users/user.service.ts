import config from '../../config'
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

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )

  userData.id = await generateStudentId(admissionSemester as IAcademicSemester)

  const response = await UserModel.create(userData)
  if (Object.keys(response).length) {
    // set id and _id as user
    payload.id = response.id
    payload.user = response._id

    const newStudent = Student.create(payload)
    return newStudent
  }
  return response
}

export const UserServices = {
  createStudentIntoDB,
}
