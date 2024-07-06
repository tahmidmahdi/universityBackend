import { Types } from 'mongoose'
import { IAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createAcademicDepartmentIntoDB = async (payload: IAcademicDepartment) => {
  const response = await AcademicDepartment.create(payload)
  return response
}

const getAllAcademicDepartmentsFromDB = async () => {
  const response = await AcademicDepartment.find()
  return response
}

const getAcademicDepartmentFromDB = async (id: Types.ObjectId) => {
  const response = await AcademicDepartment.findById(id)
  return response
}

const updateAcademicDepartmentIntoDB = async (
  id: Types.ObjectId,
  payload: Partial<IAcademicDepartment>,
) => {
  const response = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return response
}

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
}
