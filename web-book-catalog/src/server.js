import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bookRoutes from './routes/books.js'; // make sure this file uses `export default`

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/books', bookRoutes);

mongoose.connect('mongodb://localhost:27017/bookCatalog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
