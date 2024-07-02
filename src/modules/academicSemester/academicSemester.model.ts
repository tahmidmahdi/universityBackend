import { Schema, model } from 'mongoose'
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
    throw Error('Academic semester already exist.')
  }
  next()
})

export const AcademicSemester = model<IAcademicSemester>(
  'academicSemester',
  academicSemesterSchema,
)
