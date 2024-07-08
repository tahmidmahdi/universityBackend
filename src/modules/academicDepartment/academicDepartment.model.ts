import { Schema, model } from 'mongoose'
import { IAcademicDepartment } from './academicDepartment.interface'

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
)

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  })

  if (isDepartmentExist) {
    throw new Error('Department already exist')
  }

  next()
})

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  const isDepartmentExist = await AcademicDepartment.findOne(query)

  if (!isDepartmentExist) {
    throw new Error('Wrong department Id')
  }

  next()
})

export const AcademicDepartment = model<IAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
)
