import type { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/apiError'
import Book from '../models/book'
import { createSuccessResponse } from '../utilities/helpers'

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, author, genre, price } = req.body

    const book = new Book({ title, author, genre, price })
    await book.save()

    const response = createSuccessResponse(
      'Book was successfully created',
      201,
      book
    )

    return res.status(201).json(response)
  } catch (err) {
    next(err)
  }
}

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 50)

    const books = await Book.find().limit(limit).lean()

    if (!books || books.length === 0) {
      const response = createSuccessResponse(
        'Successfully retrieved 0 books.',
        200,
        []
      )

      return res.status(200).json(response)
    }

    const response = createSuccessResponse(
      `Successfully retrieved ${books.length} ${
        books.length === 1 ? 'book' : 'books'
      }.`,
      200,
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
      200,
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
    const updates = req.body

    const updatedBook = await Book.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })

    if (!updatedBook) {
      throw ApiError.notFound(`The book with ID '${id}' does not exist.`)
    }

    const response = createSuccessResponse(
      `Successfully updated book with ID '${id}' - '${updatedBook.title}'`,
      200,
      updatedBook
    )

    return res.status(200).json(response)
  } catch (err) {
    next(err)
  }
}

export const patchBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const updates = req.body

    const patchedBook = await Book.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })

    if (!patchedBook) {
      throw ApiError.notFound(`The book with ID '${id}' does not exist.`)
    }

    const response = createSuccessResponse(
      `Successfully patched book with ID '${id}' - '${patchedBook.title}'`,
      200,
      patchedBook
    )

    return res.status(200).json(response)
  } catch (err) {
    next(err)
  }
}

export const deleteBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const deletedBook = await Book.findByIdAndDelete(id)

    if (!deletedBook) {
      throw ApiError.notFound(`The book with ID '${id}' does not exist.`)
    }

    const response = createSuccessResponse(
      `Successfully deleted book with ID '${id}' - '${deletedBook.title}'`,
      200,
      null
    )

    return res.status(200).json(response)
  } catch (err) {
    next(err)
  }
}
