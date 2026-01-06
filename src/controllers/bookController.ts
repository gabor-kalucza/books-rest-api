import type { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/apiError'
import Book from '../models/book'
import { createSuccessResponse } from '../utilities/helpers'

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10

    const books = await Book.find().limit(limit).lean()

    if (!books || books.length === 0) {
      throw ApiError.notFound('No books found')
    }

    const response = createSuccessResponse(
      `Successfully retrieved ${books.length} ${
        books.length === 1 ? 'book' : 'books'
      }.`,
      books
    )

    return res.status(200).json(response)
  } catch (err) {
    next(err)
  }
}

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const book = await Book.findById(id).lean()

    if (!book) {
      throw ApiError.notFound('Book not found')
    }

    const response = createSuccessResponse(
      `Successfully retrieved book with ID '${id}' - '${book.title}'`,
      book
    )

    return res.status(200).json(response)
  } catch (err) {
    next(err)
  }
}

export const updateBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { title, author, genre, price } = req.body

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, genre, price },
      { new: true, runValidators: true }
    ).lean()

    if (!updatedBook) {
      throw ApiError.notFound(`The book with ID '${id}' does not exist.`)
    }

    const response = createSuccessResponse(
      `Successfully updated book with ID '${id}' - '${updatedBook.title}'`,
      updatedBook
    )

    return res.status(200).json(response)
  } catch (err) {
    next(err)
  }
}
