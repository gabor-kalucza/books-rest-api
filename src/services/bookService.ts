import ApiError from '../errors/apiError'
import * as bookRepository from '../repositories/bookRepository'
import { BookDTO } from '../types/BookDTO'

export const createBook = async (data: BookDTO) => {
  return await bookRepository.create(data)
}

export const getAllBooks = async (limit: number) => {
  return await bookRepository.findAll(limit)
}

export const getBookById = async (id: string) => {
  const book = await bookRepository.findById(id)

  if (!book) {
    throw ApiError.notFound('Book not found')
  }

  return book
}

export const updateBook = async (id: string, data: BookDTO) => {
  const updated = await bookRepository.updateById(id, data)

  if (!updated) {
    throw ApiError.notFound(`The book with ID '${id}' does not exist.`)
  }

  return updated
}

export const patchBook = async (id: string, updates: Partial<BookDTO>) => {
  const patched = await bookRepository.updateById(id, updates)

  if (!patched) {
    throw ApiError.notFound(`The book with ID '${id}' does not exist.`)
  }

  return patched
}

export const deleteBook = async (id: string) => {
  const deleted = await bookRepository.deleteById(id)

  if (!deleted) {
    throw ApiError.notFound(`The book with ID '${id}' does not exist.`)
  }

  return deleted
}
