import type { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/apiError'

const DEFAULT_ERR_MSG = 'Something went wrong'

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      statusCode: err.statusCode,
      data: null,
    })
  }

  console.error(err)

  return res.status(500).json({
    success: false,
    message: DEFAULT_ERR_MSG,
    statusCode: 500,
    data: null,
  })
}

export default errorHandler
