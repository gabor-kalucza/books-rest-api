import express from 'express'
import mongoose from 'mongoose'
import { mongoURI, PORT } from './src/config/config'
import ApiError from './src/errors/apiError'
import errorHandler from './src/middleware/errorHandler'
import bookRoutes from './src/routes/bookRoutes'

const app = express()

if (!process.env.MONGO_URI) {
  console.warn(
    'Warning: MONGO_URI not set — using default. If you do not have MongoDB installed, please install and start mongod, or copy `.env.example` to `.env` and set `MONGO_URI`.'
  )
}

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(() => {
    const error = ApiError.internal('Failed to connect to the database')
    console.error(error.message)
    process.exit(1)
  })

app.use(express.json())
app.use(bookRoutes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
