import { Model, Types } from 'mongoose'

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type TUsername = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string
  user: Types.ObjectId
  name: TUsername
  gender: 'male' | 'female'
  dateOfBirth?: string
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  admissionSemester: Types.ObjectId
  academicDepartment: Types.ObjectId
  localGuardian: TLocalGuardian
  profileImg?: string
  isDeleted?: boolean
}

export type StudentMethods = {
  isUserExist(id: string): Promise<TStudent | null>
}

export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>
