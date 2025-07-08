import express from 'express'
import Book from '../models/Book.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// example command : GET /api/books?page=1&limit=5 
// Get books from the database with pagination support
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 5
  const skip = (page - 1) * limit

  try {
    const total = await Book.countDocuments()
    const books = await Book.find().skip(skip).limit(limit)

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: books
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error })
  }
})

// example POST /api/books 
// Add a new book (only for authenticated users)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      year,
      rating,
      pages,
      description
    } = req.body

    const newBook = new Book({
      title,
      author,
      genre,
      year,
      rating,
      pages,
      description,
      createdBy: req.user.id // optional: track who added it
    })

    const saved = await newBook.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(400).json({ message: 'Failed to add book', error })
  }
})

export default router
