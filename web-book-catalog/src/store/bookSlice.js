import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Mock API data (since there's no free books API, we'll use sample data)
const sampleBooks = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    year: 1960,
    description: "A gripping tale of racial injustice and childhood innocence in the American South.",
    pages: 376,
    rating: 4.3
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian Fiction",
    year: 1949,
    description: "A dystopian social science fiction novel about totalitarian control.",
    pages: 328,
    rating: 4.2
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    year: 1813,
    description: "A romantic novel about manners, upbringing, morality, and marriage.",
    pages: 432,
    rating: 4.1
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: 1925,
    description: "A classic American novel about the Jazz Age and the American Dream.",
    pages: 180,
    rating: 3.9
  },
  {
    id: 5,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    year: 1997,
    description: "The first book in the magical Harry Potter series.",
    pages: 223,
    rating: 4.5
  }
]

// Simulate API call
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    return sampleBooks
  }
)

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    apiBooks: [],
    myBooks: [],
    status: 'idle',
    error: null,
    searchTerm: '',
    selectedGenre: 'all',
  },
  reducers: {
    addBook: (state, action) => {
      const newBook = {
        id: `user-${Date.now()}`,
        title: action.payload.title,
        author: action.payload.author,
        genre: action.payload.genre,
        year: action.payload.year,
        description: action.payload.description,
        pages: action.payload.pages,
        rating: action.payload.rating || 0,
        isUserAdded: true,
      }
      state.myBooks.unshift(newBook)
    },
    removeBook: (state, action) => {
      state.myBooks = state.myBooks.filter(book => book.id !== action.payload)
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload
    },
    updateBook: (state, action) => {
        const updatedBook = action.payload;
        const index = state.myBooks.findIndex(book => book.id === updatedBook.id);

  if (index !== -1) {
    state.myBooks[index] = {
      ...state.myBooks[index],
      ...updatedBook, // merge new fields
    };
  }
}
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.apiBooks = action.payload
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { addBook, removeBook, setSearchTerm, setSelectedGenre,updateBook } = bookSlice.actions
export default bookSlice.reducer