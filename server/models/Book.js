import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  year: Number,
  rating: Number,
  pages: Number,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
})

const Book = mongoose.model('Book', bookSchema)
export default Book
