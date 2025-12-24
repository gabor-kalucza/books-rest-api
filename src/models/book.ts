import mongoose, { Schema, Document } from 'mongoose';

interface IBook {
  title: string;
  author: string;
  genre: string;
  price: number;
}

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

const Book = mongoose.model<IBook>('Book', BookSchema);

export default Book;
