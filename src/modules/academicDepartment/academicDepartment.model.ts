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
      ref: 'academicFaculty',
    },
  },
  {
    timestamps: true,
  },
)

export const AcademicDepartment = model<IAcademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema,
)
