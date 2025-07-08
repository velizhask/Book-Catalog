import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeBook } from '../store/bookSlice'

const BookDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { apiBooks, myBooks } = useSelector((state) => state.books)

  // Find book in user books first, then API books
  let book = myBooks.find((b) => b.id === id)
  if (!book) {
    book = apiBooks.find((b) => b.id === parseInt(id))
  }

  const handleRemoveBook = () => {
    if (window.confirm('Are you sure you want to remove this book from your collection?')) {
      dispatch(removeBook(id))
      navigate('/my-books')
    }
  }

  if (!book) {
    return (
      <div className="book-detail">
        <div className="not-found">
          <h1>📚 Book Not Found</h1>
          <p>The book you're looking for doesn't exist in our catalog.</p>
          <Link to="/" className="btn btn-primary">← Back to Catalog</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="book-detail">
      <div className="detail-header">
        <Link to="/" className="back-link">← Back to Catalog</Link>
        {book.isUserAdded && (
          <button onClick={handleRemoveBook} className="btn btn-danger">
            Remove from My Books
          </button>
        )}
      </div>

      <div className="book-detail-content">
        <div className="book-cover-large">
          <div className="book-spine-large"></div>
          <div className="book-content-large">
            <h1>{book.title}</h1>
            <h2>by {book.author}</h2>
          </div>
        </div>

        <div className="book-details">
          {book.isUserAdded && <span className="user-badge-large">My Book</span>}
          
          <div className="detail-grid">
            <div className="detail-item">
              <strong>Genre:</strong>
              <span>{book.genre}</span>
            </div>
            <div className="detail-item">
              <strong>Published:</strong>
              <span>{book.year}</span>
            </div>
            <div className="detail-item">
              <strong>Pages:</strong>
              <span>{book.pages}</span>
            </div>
            <div className="detail-item">
              <strong>Rating:</strong>
              <span>⭐ {book.rating}/5</span>
            </div>
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetail