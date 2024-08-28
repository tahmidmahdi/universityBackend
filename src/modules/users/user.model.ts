import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../config'
import { IUser } from './user.interface'
const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', async function (next) {
  // const user = this
  this.password = await bcrypt.hash(
    this.password as string,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

userSchema.post('save', function (document, next) {
  delete document.password
  next()
})

export const UserModel = model<IUser>('User', userSchema)
