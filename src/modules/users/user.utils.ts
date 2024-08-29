import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { UserModel } from './user.model'

const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean()
  return lastStudent?.id ? lastStudent?.id : undefined
}

export const generateStudentId = async (
  payload: IAcademicSemester,
): Promise<string> => {
  let currentId = (0).toString()
  const lastStudentId = await findLastStudentId()
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6)
  const lastStudentYear = lastStudentId?.substring(0, 4)
  const currentSemesterCode = payload.code
  const currentYear = payload.year
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6)
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  incrementId = `${payload.year}${payload.code}${incrementId}`
  return incrementId
}

export const generateFacultyId = async () => {
  const lastFaculty = await UserModel.findOne({
    role: 'faculty',
  })
    .sort({ createdAt: -1 })
    .select({ id: 1 })
  if (!lastFaculty) {
    const facultyInitializedId = '0001'
    return facultyInitializedId
  }
  const currentIdInNumber = Number(lastFaculty.id)
  const withFiller = Number(currentIdInNumber + 1)
    .toString()
    .padStart(4, '0')
  return withFiller
}

export const findLastAdminId = async () => {
  const lastAdmin = await UserModel.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined
}

export const generateAdminId = async () => {
  let currentId = (0).toString()
  const lastAdminId = await findLastAdminId()

  if (lastAdminId) {
    currentId = lastAdminId.substring(2)
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')

  incrementId = `A-${incrementId}`
  return incrementId
}
