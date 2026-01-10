import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Book from '../src/models/book'
import { books } from './books.data'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookdb'

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB')

    await Book.deleteMany({})
    console.log('Existing books removed')

    const created = await Book.insertMany(books)
    console.log(`Inserted ${created.length} books`)

    await mongoose.disconnect()
    console.log('Database connection closed')
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  }
}

seed()
