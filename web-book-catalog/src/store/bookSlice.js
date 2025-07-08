import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get('http://localhost:3000/api/books');
  return response.data;
});

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    removeBook: (state, action) => {
      state.books = state.books.filter(book => book._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addBook, removeBook } = bookSlice.actions;
export default bookSlice.reducer;
