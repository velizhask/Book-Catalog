//Server.js is the entry point of the Express backend server.
//It connects to MongoDB, sets up middleware, and starts the app on the defined port.

import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

// Import routes
import bookRoutes from './routes/bookRoutes.js'

// Load environment variables from .env file
dotenv.config()

const app = express()

//Enable CORS to allow frontend requests (example from localhost: 5173)
app.use(cors())

//Middleware to parse JSON requests
//This is necessary for handling JSON data in requests.
app.use(express.json())

// Register API routes under /api/books
app.use('/api/books', bookRoutes)

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`)
    })
  })
  .catch((err) => console.error('MongoDB connection error:', err)) 