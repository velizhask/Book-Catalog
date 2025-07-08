import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchBooks } from '../store/bookSlice';

const BookList = () => {
const dispatch = useDispatch();
const { books, status, error } = useSelector((state) => state.books);
import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// Import actions from Redux
import { fetchBooksByPage, setSearchTerm, setSelectedGenre } from '../store/bookSlice'

const BookList = () => {
  const dispatch = useDispatch()

  // Get necessary values from Redux state
  const {
    items,           // Books fetched from backend
    myBooks,         // Locally added books
    status,          // Fetch status
    error,           // Error from fetch
    searchTerm,      // Search keyword
    selectedGenre,   // Genre filter
    totalPages       // Total pages from backend
  } = useSelector((state) => state.books)

  // Local state for current page
  const [page, setPage] = useState(1)

  // Fetch books whenever the component loads or page changes
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>{book.title}</li>
        ))}
      </ul>
    dispatch(fetchBooksByPage(page))
  }, [dispatch, page])

  // Combine backend books and user's own added books
  const allBooks = [...myBooks, ...items]

  // Filter books based on search and genre
  const filteredBooks = useMemo(() => {
    return allBooks.filter(book => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre
      return matchesSearch && matchesGenre
    })
  }, [allBooks, searchTerm, selectedGenre])

  // Get unique genres for filter dropdown
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(allBooks.map(book => book.genre))]
    return uniqueGenres.sort()
  }, [allBooks])

  // Loading state
  if (status === 'loading') {
    return <div className="loading">Loading books...</div>
  }

  // Error state
  if (status === 'failed') {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div className="book-list">
      <div className="page-header">
        <h1>Book Catalog</h1>
        <p>Discover and manage your book collection</p>
      </div>

      {/* Search and Genre Filter Controls */}
      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search books by title or author..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
        </div>
        <div className="filter-box">
          <select 
            value={selectedGenre} 
            onChange={(e) => dispatch(setSelectedGenre(e.target.value))}
          >
            <option value="all">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="no-books">
          <p>No books found matching your criteria.</p>
          <Link to="/add-book" className="btn btn-primary">Add Your First Book</Link>
        </div>
      ) : (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <div key={book._id || book.id} className={`book-card ${book.isUserAdded ? 'user-book' : ''}`}>
              {book.isUserAdded && <span className="user-badge">My Book</span>}

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

                <Link to={`/book/${book._id || book.id}`} className="btn btn-outline">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;