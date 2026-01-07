import mongoose, { Schema } from 'mongoose'
import type Book from '../types/book'

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
)

const Book = mongoose.model<Book>('Book', BookSchema)

export default Book
