import ApiError from '../errors/apiError'
import type { SuccessResponse } from '../types/apiResponses'

export const createSuccessResponse = <T>(
  message: string,
  statusCode: number,
  data: T
): SuccessResponse<T> => ({
  success: true,
  statusCode,
  message,
  data,
})

export const handleNotFound = (item: any, message: string) => {
  if (!item) {
    throw ApiError.notFound(message)
  }
}
