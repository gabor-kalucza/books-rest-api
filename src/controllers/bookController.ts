import { Request, Response } from 'express';
import Book from '../models/book';

export const createBook = async (req: Request, res: Response) => {
  const { title, author, genre, price } = req.body;

  try {
    const newBook = new Book({ title, author, genre, price });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error('Error saving book:', err);
    res.status(500).json({ message: 'Error saving book', error: err });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find().lean();
    res.status(200).json(books);
  } catch (err) {
    console.error('Error retrieving books:', err);
    res.status(500).json({ message: 'Error retrieving books', error: err });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).lean();
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (err) {
    console.error('Error fetching book', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const updateBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, genre, price } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, genre, price },
      { new: true, runValidators: true },
    ).lean();

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(updatedBook);
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).json({ message: 'Error updating book', error: err });
  }
};

export const deleteBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).json({ message: 'Error deleting book', error: err });
  }
};
