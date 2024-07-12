export interface IErrorSource {
  path: string | number
  message: string
}

export interface IGenericError {
  statusCode: number
  message: string
  errorSources: Array<IErrorSource>
}
