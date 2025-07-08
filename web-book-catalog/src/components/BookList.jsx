import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchBooks } from '../store/bookSlice';

const BookList = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.books);

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
    </div>
  );
};

export default BookList;
