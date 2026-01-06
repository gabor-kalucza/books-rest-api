import ApiError from '../errors/apiError'
import type { ApiResponse } from '../types/apiResponses'

export const createSuccessResponse = <T>(
  message: string,
  data: T
): ApiResponse<T> => ({
  success: true,
  message,
  data,
})

export const handleNotFound = (item: any, message: string) => {
  if (!item) {
    throw ApiError.notFound(message)
  }
}
