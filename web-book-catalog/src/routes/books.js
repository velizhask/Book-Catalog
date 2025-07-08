import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.post('/', async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.status(201).json(newBook);
});

// more routes if needed...

export default router;
