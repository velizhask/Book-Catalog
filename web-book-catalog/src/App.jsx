import { Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import BookList from './components/BookList'
import BookDetail from './components/BookDetail'
import AddBook from './components/AddBook'
import MyBooks from './components/MyBooks'
import LoginRegister from './components/LoginRegister'
import './App.css'

function App() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/'

  return (
    <div className="App">
      {!isLoginPage && <Navigation />}
      <main className={isLoginPage ? '' : 'container'}>
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/my-books" element={<MyBooks />} />
        </Routes>
      </main>
    </div>
  )
}

export default App