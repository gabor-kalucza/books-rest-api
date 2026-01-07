import type { NextFunction, Request, Response } from 'express'
import * as bookService from '../services/bookService'
import { createSuccessResponse } from '../utilities/helpers'

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await bookService.createBook(req.body)

    const response = createSuccessResponse(
      `Book '${book.title}' by ${book.author} was successfully created`,
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
    const { limit } = req.query

    const parsedLimit = Math.min(parseInt(limit as string) || 10, 50)

    const books = await bookService.getAllBooks(parsedLimit)

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
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const book = await bookService.getBookById(id)

    const response = createSuccessResponse(
      `Successfully retrieved book '${book.title}' by ${book.author}`,
      200,
      book
    )

    return res.status(200).json(response)
  } catch (err) {
    next(err)
  }
}

export const updateBookById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const updatedBook = await bookService.updateBook(id, req.body)

    const response = createSuccessResponse(
      `Successfully updated book '${updatedBook.title}' by ${updatedBook.author}`,
      200,
      updatedBook
    )

    return res.status(200).json(response)
  } catch (err) {
    next(err)
  }
}

export const patchBookById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const patchedBook = await bookService.patchBook(id, req.body)

    const response = createSuccessResponse(
      `Successfully patched book '${patchedBook.title}' by ${patchedBook.author}`,
      200,
      patchedBook
    )

    return res.status(200).json(response)
  } catch (err) {
    next(err)
  }
}

export const deleteBookById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const deletedBook = await bookService.deleteBook(id)

    const response = createSuccessResponse(
      `Successfully deleted book '${deletedBook.title}' by ${deletedBook.author}`,
      200,
      null
    )

    return res.status(200).json(response)
  } catch (err) {
    next(err)
  }
}
