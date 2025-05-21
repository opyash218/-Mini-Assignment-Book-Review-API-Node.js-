const express = require('express');
const {
  createBook,
  getBooks,
  getBookById,
  searchBooks
} = require('../controllers/bookController');
const protect = require('../middleware/auth');
const { addReview } = require('../controllers/reviewController');

const router = express.Router();

router.get('/', getBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);
router.post('/', protect, createBook);
router.post('/:id/reviews', protect, addReview);

module.exports = router;
