import { body, param } from 'express-validator';

export const createBookValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),
];

export const idParamValidation = [
  param('id').isMongoId().withMessage('Invalid book id'),
];

export const updateBookValidation = [
  param('id').isMongoId().withMessage('Invalid book id'),
  body('title').optional().notEmpty().withMessage('Title must not be empty'),
  body('author').optional().notEmpty().withMessage('Author must not be empty'),
  body('genre').optional().notEmpty().withMessage('Genre must not be empty'),
  body('price')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),
];
