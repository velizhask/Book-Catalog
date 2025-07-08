import { Link, useLocation } from 'react-router-dom'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { User } from 'lucide-react'

const Navigation = () => {
  const location = useLocation()
  const linksRef = useRef([])

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link'
  }

  const handleLinkHover = (e, isEntering) => {
    gsap.to(e.target, {
      scale: isEntering ? 1.05 : 1,
      duration: 0.2,
      ease: "power2.out"
    })
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/books" className="nav-logo">
          📚 Book Catalog
        </Link>
        <div className="nav-center">
          <div className="nav-links">
            <Link 
              to="/books" 
              className={isActive('/books')}
              ref={el => linksRef.current[0] = el}
              onMouseEnter={(e) => handleLinkHover(e, true)}
              onMouseLeave={(e) => handleLinkHover(e, false)}
            >
              All Books
            </Link>
            <Link 
              to="/my-books" 
              className={isActive('/my-books')}
              ref={el => linksRef.current[1] = el}
              onMouseEnter={(e) => handleLinkHover(e, true)}
              onMouseLeave={(e) => handleLinkHover(e, false)}
            >
              My Books
            </Link>
            <Link 
              to="/add-book" 
              className={isActive('/add-book')}
              ref={el => linksRef.current[2] = el}
              onMouseEnter={(e) => handleLinkHover(e, true)}
              onMouseLeave={(e) => handleLinkHover(e, false)}
            >
              Add Book
            </Link>
          </div>
        </div>
        <div className="nav-right">
          <Link to="/" className="profile-btn">
            <User size={20} color="white" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation