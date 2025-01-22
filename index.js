import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// import bodyParser from 'body-parser';
import booksRouter from './routes/books.js';

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(
    cors({
        origin:'http://localhost:3000',
        methods : ['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content-Type'],
        })
      );

const PORT = 3000;
const mongoDB_URL = " your connection string here "
// MongoDB connection
mongoose.connect(mongoDB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Use the books routes
app.use('/books', booksRouter);

// Set the port for the application

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
