import { Types } from 'mongoose'
import { IAcademicFaculty } from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'

const createAcademicFacultyIntoDB = async (payload: IAcademicFaculty) => {
  const response = await AcademicFaculty.create(payload)
  return response
}

const getAllAcademicFacultiesFromDB = async () => {
  const response = await AcademicFaculty.find()
  return response
}

const getAcademicFacultyFromDB = async (id: Types.ObjectId) => {
  const response = await AcademicFaculty.findById(id)
  return response
}

const updateAcademicFacultyIntoDB = async (
  id: Types.ObjectId,
  payload: Partial<IAcademicFaculty>,
) => {
  const response = await AcademicFaculty.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return response
}

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
}
