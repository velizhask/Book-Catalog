import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import BookList from './components/BookList'
import BookDetail from './components/BookDetail'
import AddBook from './components/AddBook'
import MyBooks from './components/MyBooks'
import './App.css'

function App() {
  return (
    <div className="App">
      <Navigation />
      <main className="container">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/my-books" element={<MyBooks />} />
        </Routes>
      </main>
    </div>
  )
}

export default App