import { model, Schema } from 'mongoose'
import {
  ICourse,
  ICourseFaculty,
  IPreRequisiteCourses,
} from './course.interface'

const preRequisiteCoursesSchema = new Schema<IPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

const courseSchema = new Schema<ICourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    trim: true,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

export const Course = model<ICourse>('Course', courseSchema)

const courseFacultySchema = new Schema<ICourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
})

export const CourseFaculty = model<ICourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
)
