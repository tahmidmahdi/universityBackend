import { Request, Response } from 'express'
import { UserServices } from './user.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body
    const response = await UserServices.createStudentIntoDB(student)
    res.status(200).json({
      success: true,
      status: 200,
      message: response,
    })
  } catch (error) {
    res.status(400).json({
      success: true,
      status: 200,
      message: error,
    })
  }
}

export const UserController = {
  createStudent,
}
