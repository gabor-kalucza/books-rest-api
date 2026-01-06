import { RequestHandler } from 'express'
import { body, param, query, validationResult } from 'express-validator'

export const validateBookId: RequestHandler[] = [
  param('id').isMongoId().withMessage('Invalid book ID format'),
]

export const validateBookFields: RequestHandler[] = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),

  body('author')
    .notEmpty()
    .withMessage('Author is required')
    .isString()
    .withMessage('Author must be a string'),

  body('genre')
    .notEmpty()
    .withMessage('Genre is required')
    .isString()
    .withMessage('Genre must be a string'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),
]

export const validateLimit: RequestHandler[] = [
  query('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Limit must be a positive integer'),
]

export const checkValidationErrors: RequestHandler = (req, res, next) => {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    const message = result
      .array()
      .map((err) => err.msg)
      .join(', ')

    return res.status(400).json({
      success: false,
      message,
      statusCode: 400,
      data: null,
    })
  }

  next()
}
