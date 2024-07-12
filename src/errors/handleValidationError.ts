import mongoose from 'mongoose'
import { IErrorSource } from '../interface/error'

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  const errorSources: Array<IErrorSource> = Object.values(error.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value.path,
        message: value.message,
      }
    },
  )

  const statusCode = 400
  return {
    statusCode,
    message: 'Validation error!',
    errorSources,
  }
}

export default handleValidationError
