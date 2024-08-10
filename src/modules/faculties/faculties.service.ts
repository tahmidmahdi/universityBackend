import { Faculty } from './faculties.model'

const getAllFacultiesFromDB = async () => {
  const response = await Faculty.find()
  return response
}

export const FacultyServices = {
  getAllFacultiesFromDB,
}
