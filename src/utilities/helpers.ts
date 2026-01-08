import type { RequestHandler } from 'express'
import ApiError from '../errors/apiError'
import type { SuccessResponse } from '../types/ApiResponses'

export const createSuccessResponse = <T>(
  message: string,
  data: T
): SuccessResponse<T> => ({
  success: true,
  message,
  data,
})

export const requireParam = (
  value: string | undefined,
  name: string
): string => {
  if (!value) {
    throw ApiError.badRequest(`Missing parameter: ${name}`)
  }
  return value
}

export const asyncHandler =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }

export const parseLimit = (
  value: unknown,
  defaultValue = 10,
  max = 50
): number => {
  const parsed = Number(value)

  if (Number.isNaN(parsed)) {
    return defaultValue
  }

  if (parsed < 1) {
    throw ApiError.badRequest('Limit must be greater than 0')
  }

  return Math.min(parsed, max)
}
