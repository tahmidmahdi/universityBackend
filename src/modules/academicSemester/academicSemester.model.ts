import httpStatus from 'http-status'
import { Schema, model } from 'mongoose'
import AppError from '../../errors/AppError'
import { IAcademicSemester } from './academicSemester.interface'

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      enum: ['Autumn', 'Summer', 'Fall'],
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      enum: ['01', '02', '03'],
      required: true,
    },
    startMonth: {
      type: String,
      enum: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      required: true,
    },
    endMonth: {
      type: String,
      enum: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  })
  if (isSemesterExist) {
    throw new AppError(404, 'Academic semester already exist.')
  }
  next()
})

academicSemesterSchema.pre('findOne', async function (next) {
  const queryId = this.getQuery()._id
  const isExist = await AcademicSemester.find(queryId)
  if (!isExist.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'Wrong Academic semester id')
  }
  next()
})

export const AcademicSemester = model<IAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)
