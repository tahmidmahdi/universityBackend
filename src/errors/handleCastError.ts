import mongoose from 'mongoose'
import { IErrorSource, IGenericError } from '../interface/error'

const handleCastError = (error: mongoose.Error.CastError): IGenericError => {
  const errorSources: Array<IErrorSource> = [
    {
      path: error.path,
      message: error.message,
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'Invalid Id!',
    errorSources,
  }
}

export default handleCastError
