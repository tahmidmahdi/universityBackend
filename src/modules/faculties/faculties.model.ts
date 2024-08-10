import { Schema, model } from 'mongoose'
import { IFaculty } from './faculties.interface'

const facultyNameSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
})

const facultySchema = new Schema<IFaculty>(
  {
    id: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    name: facultyNameSchema,
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export const Faculty = model<IFaculty>('Faculty', facultySchema)
