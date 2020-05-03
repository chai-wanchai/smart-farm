import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"

export interface IError {
  statusCode: number,
  errorMessage: string | null,
  errorCode: string | null,
  data?: any,
  [key: string]: any
}
export class ErrorHandle {
  private error: IError = {
    statusCode: 500,
    errorMessage: null,
    errorCode: null,
    data: {}
  }
  constructor(ErrorData: any) {
    this.handleError(ErrorData)
  }
  public getError(): IError {
    return this.error
  }
  public handleError(ErrorData: any) {
    if (ErrorData.isAxiosError) {
      if (ErrorData.response) {
        this.error.statusCode = ErrorData.response.status
        console.log(ErrorData.response.data)
        if('data' in ErrorData.response){
          this.error =ErrorData.response.data
        }
      }
      return
    } else if (ErrorData instanceof TypeError) {
      this.error.errorMessage = ErrorData.message
      this.error.errorCode = ErrorData.name.toUpperCase()
      if (process.env.NODE_ENV !== 'production') {
        this.error.stack = ErrorData.stack
      }
    } else if (ErrorData instanceof JsonWebTokenError) {
      this.error.statusCode = 401
      this.error.errorMessage = ErrorData.message
      if (ErrorData instanceof TokenExpiredError) {
        this.error.statusCode = 403
        this.error.errorCode = ErrorData.name
        this.error.errorMessage = 'Token Expired'
      }
    } else if (ErrorData instanceof ErrorHandle) {
      this.error = ErrorData.getError()
    }
    if ('message' in ErrorData) {
      this.error.errorMessage = ErrorData.message
    }
    if ('name' in ErrorData) {
      this.error.errorCode = ErrorData.name;
    }
    if ('errors' in ErrorData) {
      this.error.data = ErrorData.errors
    }
  }

}