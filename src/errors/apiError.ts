class ApiError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number = 500) {
    super(message)
    this.statusCode = statusCode
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }

  static badRequest(message: string) {
    return new ApiError(message, 400)
  }

  static notFound(message: string) {
    return new ApiError(message, 404)
  }

  static internal(message: string) {
    return new ApiError(message, 500)
  }
}

export default ApiError
