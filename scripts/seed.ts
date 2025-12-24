import mongoose from 'mongoose';
import Book from '../src/models/book';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookdb';

const sampleBooks = Array.from({ length: 20 }).map((_, i) => ({
  title: `Sample Book ${i + 1}`,
  author: `Author ${i + 1}`,
  genre: ['Fiction', 'Sci-Fi', 'Fantasy', 'Non-fiction'][i % 4],
  price: parseFloat((Math.random() * 20 + 5).toFixed(2)),
}));

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to Mongo — seeding books...');
    await Book.deleteMany({});
    const created = await Book.insertMany(sampleBooks);
    console.log(`Inserted ${created.length} books.`);
    await mongoose.disconnect();
    console.log('Seed complete — disconnected.');
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
