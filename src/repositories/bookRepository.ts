import Book from '../models/book'
import { BookDTO } from '../types/BookDTO'

export const create = async (data: BookDTO) => {
  const book = new Book(data)
  return await book.save()
}

export const findAll = async (limit: number) => {
  return await Book.find().limit(limit).lean()
}

export const findById = async (id: string) => {
  return await Book.findById(id).lean()
}

export const updateById = async (id: string, updates: Partial<BookDTO>) => {
  return await Book.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  })
}

export const deleteById = async (id: string) => {
  return await Book.findByIdAndDelete(id)
}
