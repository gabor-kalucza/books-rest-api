import { Router } from 'express'
import * as bookController from '../controllers/bookController'
import {
  checkValidationErrors,
  partialValidateBookFields,
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

router.patch(
  '/api/books/:id',
  validateBookId,
  partialValidateBookFields,
  checkValidationErrors,
  bookController.patchBookById
)

router.delete(
  '/api/books/:id',
  validateBookId,
  checkValidationErrors,
  bookController.deleteBookById
)

export default router
