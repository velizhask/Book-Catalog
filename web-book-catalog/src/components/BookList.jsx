import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchBooks, setSearchTerm, setSelectedGenre } from '../store/bookSlice'
import { motion, AnimatePresence } from 'framer-motion'

const BookList = () => {
  const dispatch = useDispatch()
  const { apiBooks, myBooks, status, error, searchTerm, selectedGenre } = useSelector((state) => state.books)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks())
    }
  }, [status, dispatch])

  // Combine all books
  const allBooks = [...myBooks, ...apiBooks]

  // Filter books based on search and genre
  const filteredBooks = useMemo(() => {
    return allBooks.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.2 },
        opacity: { duration: 0.1 }
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  }

  const handleGenreSelect = (genre) => {
    dispatch(setSelectedGenre(genre))
    setIsDropdownOpen(false)
  }

  if (status === 'loading') {
    return <div className="loading">Loading books...</div>
  }

  if (status === 'failed') {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div className="book-list">
      <div className="page-header">
        <h1>Book Catalog</h1>
        <p>Discover and manage your book collection</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search books by title or author..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
        </div>
        <div className="filter-box" style={{ position: 'relative' }}>
          <button 
            className="custom-dropdown-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedGenre === 'all' ? 'All Genres' : selectedGenre}
            <span style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
          </button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  right: 0,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  zIndex: 10,
                  overflow: 'hidden'
                }}
              >
                <motion.div
                  variants={itemVariants}
                  onClick={() => handleGenreSelect('all')}
                  style={{
                    padding: '1rem',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    color: 'grey',
                    backgroundColor: selectedGenre === 'all' ? 'rgba(102, 126, 234, 0.1)' : 'transparent'
                  }}
                  whileHover={{ backgroundColor: 'rgba(102, 126, 234, 0.05)' }}
                >
                  All Genres
                </motion.div>
                {genres.map(genre => (
                  <motion.div
                    key={genre}
                    variants={itemVariants}
                    onClick={() => handleGenreSelect(genre)}
                    style={{
                      padding: '1rem',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      color: 'grey',
                      backgroundColor: selectedGenre === genre ? 'rgba(102, 126, 234, 0.1)' : 'transparent'
                    }}
                    whileHover={{ backgroundColor: 'rgba(102, 126, 234, 0.05)' }}
                  >
                    {genre}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
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
            <div key={book.id} className={`book-card ${book.isUserAdded ? 'user-book' : ''}`}>
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
                
                <Link to={`/book/${book.id}`} className="btn btn-outline">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BookList