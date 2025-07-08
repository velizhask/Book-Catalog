// App.jsx

import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import komponen Anda
import Navigation from './components/Navigation';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import AddBook from './components/AddBook';
import MyBooks from './components/MyBooks';

// Import komponen baru
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

function App() {
  // State untuk menyimpan data user (null jika belum login)
  const [user, setUser] = useState(null);

  // Cek status login dari localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  // Fungsi untuk handle login
  const handleLogin = (username) => {
    localStorage.setItem('user', username);
    setUser(username);
  };

  // Fungsi untuk handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="App">
      {/* Tampilkan navigasi hanya jika sudah login */}
      {user && <Navigation onLogout={handleLogout} />}

      <main className="container">
        <Routes>
          {/* Rute untuk Login Page (Publik) */}
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />
            }
          />

          {/* Rute-rute yang dilindungi */}
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <BookList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book/:id"
            element={
              <ProtectedRoute user={user}>
                <BookDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-book"
            element={
              <ProtectedRoute user={user}>
                <AddBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-books"
            element={
              <ProtectedRoute user={user}>
                <MyBooks />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;