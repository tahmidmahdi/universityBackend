import httpStatus from 'http-status'
import { startSession } from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { UserModel } from '../users/user.model'
import { studentSearchableFields } from './student.constant'
import { TStudent } from './student.interface'
import { Student } from './student.model'

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const studentSearchableFields = ['email', 'name.firstName', 'presentAddress']
  // let searchTerm = ''

  // if (query.searchTerm) {
  //   searchTerm = query?.searchTerm as string
  // }
  // const queryObject = { ...query }

  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map(field => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })

  // filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']

  // excludeFields.forEach(element => delete queryObject[element])

  // console.log({ query, queryObject })

  // const filterQuery = searchQuery
  //   .find(queryObject)
  //   .populate('user')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //       strictPopulate: false,
  //     },
  //   })

  // let sort = '-createdAt'
  // if (query.sort) {
  //   sort = query.sort as string
  // }

  // const sortQuery = filterQuery.sort(sort)

  // let page = 1
  // let limit = 1
  // let skip = 0

  // if (query.limit) {
  //   limit = Number(query.limit)
  // }

  // if (query.page) {
  //   page = Number(query.page)
  //   skip = (page - 1) * limit
  // }

  // const paginateQuery: any = sortQuery.skip(skip)

  // const limitQuery = paginateQuery.limit(limit)

  // field limiting
  // let fields = '-__v'

  // fields: "name,email"
  // to
  // fields: "name email"
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ')
  // }

  // const fieldQuery = await limitQuery.select(fields)

  // return fieldQuery
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
          strictPopulate: false,
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const response = await studentQuery.modelQuery
  return response
}

const getStudentFromDB = async (id: string) => {
  try {
    const response = Student.findOne({ id })
      .populate('user')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
          strictPopulate: false,
        },
      })
    return response
  } catch (error) {}
}

const deleteStudentFromDB = async (id: string) => {
  const session = await startSession()

  try {
    session.startTransaction()
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to delete student')
  }
}

const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }

  console.log(modifiedUpdatedData)

  const response = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return response
}

export const StudentServices = {
  getAllStudentsFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
}
