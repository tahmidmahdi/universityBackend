import { IUser } from './user.interface'
import { UserModel } from './user.model'

const createStudentIntoDB = async (payload: IUser) => {
  const response = await UserModel.create(payload)
  return response
}

export const UserServices = {
  createStudentIntoDB,
}
