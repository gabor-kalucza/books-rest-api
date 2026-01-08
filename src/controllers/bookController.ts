import * as bookService from '../services/bookService'
import {
  asyncHandler,
  createSuccessResponse,
  parseLimit,
  requireParam,
} from '../utilities/helpers'

export const createBook = asyncHandler(async (req, res) => {
  const book = await bookService.createBook(req.body)

  return res
    .status(201)
    .json(
      createSuccessResponse(
        `Book '${book.title}' by ${book.author} was successfully created`,
        book
      )
    )
})

export const getAllBooks = asyncHandler(async (req, res) => {
  const limit = parseLimit(req.query.limit)

  const books = await bookService.getAllBooks(limit)

  return res
    .status(200)
    .json(
      createSuccessResponse(
        `Successfully retrieved ${books.length} ${
          books.length === 1 ? 'book' : 'books'
        }.`,
        books
      )
    )
})

export const getBookById = asyncHandler(async (req, res) => {
  const id = requireParam(req.params.id, 'id')
  const book = await bookService.getBookById(id)

  return res
    .status(200)
    .json(
      createSuccessResponse(
        `Successfully retrieved book '${book.title}' by ${book.author}`,
        book
      )
    )
})

export const updateBookById = asyncHandler(async (req, res) => {
  const id = requireParam(req.params.id, 'id')
  const updatedBook = await bookService.updateBook(id, req.body)

  return res
    .status(200)
    .json(
      createSuccessResponse(
        `Successfully updated book '${updatedBook.title}' by ${updatedBook.author}`,
        updatedBook
      )
    )
})

export const patchBookById = asyncHandler(async (req, res) => {
  const id = requireParam(req.params.id, 'id')
  const patchedBook = await bookService.patchBook(id, req.body)

  return res
    .status(200)
    .json(
      createSuccessResponse(
        `Successfully patched book '${patchedBook.title}' by ${patchedBook.author}`,
        patchedBook
      )
    )
})

export const deleteBookById = asyncHandler(async (req, res) => {
  const id = requireParam(req.params.id, 'id')
  const deletedBook = await bookService.deleteBook(id)

  return res
    .status(200)
    .json(
      createSuccessResponse(
        `Successfully deleted book '${deletedBook.title}' by ${deletedBook.author}`,
        null
      )
    )
})
