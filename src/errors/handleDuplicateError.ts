/* eslint-disable @typescript-eslint/no-explicit-any */
import { IErrorSource, IGenericError } from '../interface/error'

const handleDuplicateError = (err: any): IGenericError => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/)

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1]

  const errorSources: Array<IErrorSource> = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ]

  const statusCode = 400

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  }
}

export default handleDuplicateError
