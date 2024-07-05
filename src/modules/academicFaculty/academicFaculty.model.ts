import { Schema, model } from 'mongoose'
import { IAcademicFaculty } from './academicFaculty.interface'

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const AcademicFaculty = model<IAcademicFaculty>(
  'academicFaculty',
  academicFacultySchema,
)
