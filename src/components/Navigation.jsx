import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link'
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          📚 Book Catalog
        </Link>
        <div className="nav-links">
          <Link to="/" className={isActive('/')}>All Books</Link>
          <Link to="/my-books" className={isActive('/my-books')}>My Books</Link>
          <Link to="/add-book" className={isActive('/add-book')}>Add Book</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation