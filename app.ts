import express from 'express';
import mongoose from 'mongoose';
import { mongoURI, PORT } from './src/config/config';
import bookRoutes from './src/routes/bookRoutes';

const app = express();

// Helpful hint when MONGO_URI is not set in .env
if (!process.env.MONGO_URI) {
  console.warn(
    'Warning: MONGO_URI not set — using default. If you do not have MongoDB installed, please install and start mongod, or copy `.env.example` to `.env` and set `MONGO_URI`.',
  );
}

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('\nMongoDB connection error:', err);
    console.error(
      'If you do not have MongoDB running locally, install it and start the `mongod` service, then try again. You can also run `npm run seed` after fixing the connection to populate sample data.',
    );
    process.exit(1);
  });

app.use(express.json());
app.use(bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
