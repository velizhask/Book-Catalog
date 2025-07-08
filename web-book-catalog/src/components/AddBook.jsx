import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addBook } from '../store/bookSlice'

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    description: '',
    pages: '',
    rating: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const genres = [
    'Fiction', 'Non-Fiction', 'Fantasy', 'Science Fiction', 'Mystery', 
    'Romance', 'Thriller', 'Biography', 'History', 'Self-Help', 
    'Poetry', 'Drama', 'Horror', 'Adventure', 'Comedy'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.title.trim() || !formData.author.trim() || !formData.genre) {
      alert('Please fill in at least title, author, and genre.')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Convert numeric fields
      const bookData = {
        ...formData,
        title: formData.title.trim(),
        author: formData.author.trim(),
        description: formData.description.trim() || 'No description provided.',
        year: parseInt(formData.year) || new Date().getFullYear(),
        pages: parseInt(formData.pages) || 0,
        rating: parseFloat(formData.rating) || 0,
      }
      
      dispatch(addBook(bookData))
      
      setShowSuccess(true)
      
      // Reset form
      setFormData({
        title: '', author: '', genre: '', year: '', 
        description: '', pages: '', rating: ''
      })
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/my-books')
      }, 2000)
      
    } catch (error) {
      console.error('Error adding book:', error)
      alert('Failed to add book. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccess) {
    return (
      <div className="add-book">
        <div className="success-message">
          <h2>✅ Book Added Successfully!</h2>
          <p>Your book has been added to your collection.</p>
          <p>Redirecting to My Books...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="add-book">
      <div className="page-header">
        <h1>Add New Book</h1>
        <p>Add a book to your personal collection</p>
      </div>
      
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Book Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title..."
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="author">Author *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name..."
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="genre">Genre *</label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            >
              <option value="">Select a genre...</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="year">Publication Year</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="e.g., 2023"
              min="1000"
              max={new Date().getFullYear()}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="pages">Number of Pages</label>
            <input
              type="number"
              id="pages"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              placeholder="e.g., 300"
              min="1"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="rating">Your Rating (0-5)</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="e.g., 4.5"
              min="0"
              max="5"
              step="0.1"
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter book description..."
            rows="4"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Book...' : 'Add Book'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddBook