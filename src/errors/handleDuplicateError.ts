import { IErrorSource, IGenericError } from '../interface/error'

const handleDuplicateError = (error: any): IGenericError => {
  const errorMatch = error.message.match(/\"([^\"]+)\"/)
  const extractedMessage = errorMatch && errorMatch[1]
  const errorSources: Array<IErrorSource> = [
    {
      path: '',
      message: `${extractedMessage} is already exist`,
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'Invalid Id!',
    errorSources,
  }
}

export default handleDuplicateError
