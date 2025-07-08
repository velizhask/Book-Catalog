import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './bookSlice'; // pastikan nama dan path benar

export default configureStore({
  reducer: {
    books: booksReducer, // pastikan ini pakai `books` bukan `book`
  },
});
