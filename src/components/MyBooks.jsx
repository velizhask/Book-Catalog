import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeBook } from '../store/bookSlice'

const MyBooks = () => {
  const dispatch = useDispatch()
  const { myBooks } = useSelector((state) => state.books)

  const handleRemoveBook = (bookId, bookTitle) => {
    if (window.confirm(`Are you sure you want to remove "${bookTitle}" from your collection?`)) {
      dispatch(removeBook(bookId))
    }
  }

  return (
    <div className="my-books">
      <div className="page-header">
        <h1>My Book Collection</h1>
        <p>Books you've added to your personal library</p>
      </div>

      {myBooks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h2>No books in your collection yet</h2>
          <p>Start building your personal library by adding some books!</p>
          <Link to="/add-book" className="btn btn-primary">Add Your First Book</Link>
        </div>
      ) : (
        <>
          <div className="collection-stats">
            <div className="stat">
              <span className="stat-number">{myBooks.length}</span>
              <span className="stat-label">Total Books</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {myBooks.reduce((sum, book) => sum + (book.pages || 0), 0)}
              </span>
              <span className="stat-label">Total Pages</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {myBooks.length > 0 ? (myBooks.reduce((sum, book) => sum + (book.rating || 0), 0) / myBooks.length).toFixed(1) : 0}
              </span>
              <span className="stat-label">Avg Rating</span>
            </div>
          </div>

          <div className="books-grid">
            {myBooks.map((book) => (
              <div key={book.id} className="book-card user-book">
                <div className="book-actions">
                  <button
                    onClick={() => handleRemoveBook(book.id, book.title)}
                    className="remove-btn"
                    title="Remove from collection"
                  >
                    ×
                  </button>
                </div>
                
                <div className="book-cover">
                  <div className="book-spine"></div>
                  <div className="book-content">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">by {book.author}</p>
                  </div>
                </div>
                
                <div className="book-info">
                  <div className="book-meta">
                    <span className="genre">{book.genre}</span>
                    <span className="year">{book.year}</span>
                  </div>
                  
                  <div className="book-stats">
                    <span className="rating">⭐ {book.rating}</span>
                    <span className="pages">📄 {book.pages}p</span>
                  </div>
                  
                  <p className="book-description">
                    {book.description.length > 100 
                      ? `${book.description.substring(0, 100)}...` 
                      : book.description}
                  </p>
                  
                  <Link to={`/book/${book.id}`} className="btn btn-outline">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default MyBooks