import mongoose from 'mongoose'
import { IErrorSource, IGenericError } from '../interface/error'

const handleCastError = (err: mongoose.Error.CastError): IGenericError => {
  const errorSources: Array<IErrorSource> = [
    {
      path: err.path,
      message: err.message,
    },
  ]

  const statusCode = 400

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  }
}

export default handleCastError
