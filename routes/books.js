import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();


router.post('/', async (req, res) => {
  const { title, author, ISBN, genre, publishedYear, publisher, pages, availableCopies } = req.body;

  const book = new Book({ title, author, ISBN, genre, publishedYear, publisher, pages, availableCopies });

  try {
    const savedBook = await book.save();
    res.status(201).json(savedBook); 
  } catch (err) {
    res.status(400).json({ error: err.message }); 
  }
});


router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books); 
  } catch (err) {
    res.status(500).json({ error: 'Error fetching books' });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book); 
  } catch (err) {
    res.status(500).json({ error: 'Error fetching the book' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(updatedBook); 
  } catch (err) {
    res.status(400).json({ error: 'Error updating the book' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' }); 
  } catch (err) {
    res.status(500).json({ error: 'Error deleting the book' });
  }
});

export default router;
