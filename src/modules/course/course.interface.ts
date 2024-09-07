import { Types } from 'mongoose'

export interface IPreRequisiteCourses {
  course: Types.ObjectId
  isDeleted: boolean
}

export interface ICourse {
  title: string
  prefix: string
  code: number
  credits: number
  preRequisiteCourses: Array<IPreRequisiteCourses>
  isDeleted: boolean
}

export interface ICourseFaculty {
  course: Types.ObjectId
  faculties: Array<Types.ObjectId>
}
