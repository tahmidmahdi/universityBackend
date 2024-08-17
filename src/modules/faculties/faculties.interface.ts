import { Types } from 'mongoose'

export interface IFacultyName {
  firstName: string
  middleName?: string
  lastName: string
}

export interface IFaculty {
  id: string
  user: Types.ObjectId
  designation: string
  role: string
  name: IFacultyName
  gender: 'male' | 'female'
  dateOfBirth?: string
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  profileImg: string
  academicDepartment: Types.ObjectId
  isDeleted?: boolean
}
