import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'
export interface IUser {
  id?: string
  email: string
  password?: string
  needsPasswordChange?: boolean
  passwordChangedAt?: Date
  role?: 'admin' | 'student' | 'faculty'
  status?: 'in-progress' | 'blocked'
  isDeleted?: boolean
}

export interface UserModels extends Model<IUser> {
  // myStaticMethod(): number
  isUserExistsByCustomId(id: string): Promise<IUser>
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean
}

export type TUserRole = keyof typeof USER_ROLE
