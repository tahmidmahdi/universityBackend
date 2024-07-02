import { RootQuerySelector, Types, UpdateQuery } from 'mongoose'
import {
  IAcademicSemester,
  IAcademicSemesterMapper,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payload: IAcademicSemester) => {
  const academicSemesterMapper: IAcademicSemesterMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  }

  if (academicSemesterMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code!')
  }

  const response = await AcademicSemester.create(payload)
  return response
}

const getAllAcademicSemesterFromDB = async () => {
  const response = await AcademicSemester.find()
  return response
}

const getAcademicSemesterFromDB = async (id: Types.ObjectId) => {
  const response = await AcademicSemester.findById({ _id: id })
  return response
}

const updateAcademicSemesterFromDB = async (
  id: RootQuerySelector<IAcademicSemester>,
  payload: UpdateQuery<IAcademicSemester>,
) => {
  const response = await AcademicSemester.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return response
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getAcademicSemesterFromDB,
  updateAcademicSemesterFromDB,
}
