export interface SuccessResponse<T> {
  success: true
  message: string
  statusCode: number
  data: T
}

export interface ErrorResponse {
  success: false
  message: string
  statusCode: number
  data: null
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse
