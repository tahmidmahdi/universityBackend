import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payload: IAcademicSemester) => {
  const response = await AcademicSemester.create(payload)
  return response
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
}
