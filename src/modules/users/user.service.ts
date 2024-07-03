import config from '../../config'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { IUser } from './user.interface'
import { UserModel } from './user.model'

const createStudentIntoDB = async (
  studentData: TStudent,
  password?: string,
) => {
  // create role
  const userData: Partial<IUser> = {
    role: 'student',
    id: '2030100003',
  }

  // year semesterCode 4digitNumber
  const generateStudentId = (payload: IAcademicSemester) => {}
  // if password not given, use default password
  userData.password = password || (config.default_password as string)

  const response = await UserModel.create(userData)
  if (Object.keys(response).length) {
    // set id and _id as user
    studentData.id = response.id
    studentData.user = response._id

    const newStudent = Student.create(studentData)
    return newStudent
  }
  return response
}

export const UserServices = {
  createStudentIntoDB,
}
