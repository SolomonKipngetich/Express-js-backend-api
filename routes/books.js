import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

// Create a new book (POST)
router.post('/', async (req, res) => {
  const { title, author, ISBN, genre, publishedYear, publisher, pages, availableCopies } = req.body;

  const book = new Book({ title, author, ISBN, genre, publishedYear, publisher, pages, availableCopies });

  try {
    const savedBook = await book.save();
    res.status(201).json(savedBook); // Respond with the saved book
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors
  }
});

// Get all books (GET)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books); // Respond with the list of books
  } catch (err) {
    res.status(500).json({ error: 'Error fetching books' });
  }
});

// Get a single book by ID (GET)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book); // Respond with the single book
  } catch (err) {
    res.status(500).json({ error: 'Error fetching the book' });
  }
});

// Update a book by ID (PUT)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(updatedBook); // Respond with the updated book
  } catch (err) {
    res.status(400).json({ error: 'Error updating the book' });
  }
});

// Delete a book by ID (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' }); // Respond with success message
  } catch (err) {
    res.status(500).json({ error: 'Error deleting the book' });
  }
});

export default router;
