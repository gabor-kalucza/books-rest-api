export interface SuccessResponse<T> {
  success: true
  message: string
  data: T
}

export interface ErrorResponse {
  success: false
  message: string
  data: null
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse
