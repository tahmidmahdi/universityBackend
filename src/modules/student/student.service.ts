import { Student } from './student.model'

const getAllStudentsFromDB = async () => {
  const response = await Student.find().populate('user')
  return response
}

const getStudentFromDB = async (id: string) => {
  try {
    const response = Student.aggregate([{ $match: { id: id } }])
    return response
  } catch (error) {}
}

const deleteStudentFromDB = async (id: string) => {
  try {
    const response = Student.updateOne({ id }, { isDeleted: true })
    return response
  } catch (error) {}
}

const updateStudentFromDB = async (id: string) => {
  const response = await Student.findOneAndUpdate({ id }, { gender: '' })
}

export const StudentServices = {
  getAllStudentsFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
}
