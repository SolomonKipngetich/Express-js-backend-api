import mongoose from 'mongoose';

// Define the schema for a Book
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  
  publishedYear: { type: Number },
  
  addedDate: { type: Date, default: Date.now },
});

// Create and export the Book model
const Book = mongoose.model('Book', bookSchema);
export default Book;
