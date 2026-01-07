import { Router } from 'express'
import * as bookController from '../controllers/bookController'
import {
  checkValidationErrors,
  validateBookFields,
  validateBookId,
  validateLimit,
} from '../middleware/validators/bookValidator'

const router = Router()

router.post(
  '/api/books',
  validateBookFields,
  checkValidationErrors,
  bookController.createBook
)

router.get(
  '/api/books',
  validateLimit,
  checkValidationErrors,
  bookController.getAllBooks
)

router.get(
  '/api/books/:id',
  validateBookId,
  checkValidationErrors,
  bookController.getBookById
)

router.put(
  '/api/books/:id',
  validateBookId,
  validateBookFields,
  checkValidationErrors,
  bookController.updateBookById
)

export default router
