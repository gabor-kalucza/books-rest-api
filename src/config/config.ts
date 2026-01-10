import dotenv from 'dotenv'

dotenv.config()

export const mongoURI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore'
export const PORT = process.env.PORT || 3000
