import { IFaculty } from './faculties.interface'
import { Faculty } from './faculties.model'

const getAllFacultiesFromDB = async () => {
  const response = await Faculty.find()
  return response
}

const getFacultyFromDB = async (id: string) => {
  const response = await Faculty.findOne({ id })
  return response
}

const updateFacultyIntoDB = async (id: string, payload: Partial<IFaculty>) => {
  const { name, ...remainingFacultyData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }
  const response = await Faculty.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return response
}

export const FacultyServices = {
  getAllFacultiesFromDB,
  getFacultyFromDB,
  updateFacultyIntoDB,
}
