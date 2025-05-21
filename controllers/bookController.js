const Book = require('../models/Book');
const Review = require('../models/Review');

exports.createBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const book = await Book.create({ title, author, genre });
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//get all books 
exports.getBooks = async (req, res) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;

    const match = {};
    if (author) match.author = author;
    if (genre) match.genre = genre;

    const books = await Book.aggregate([
      { $match: match },
      {
        $lookup: {
          from: 'reviews',             // collection name for reviews
          localField: '_id',
          foreignField: 'book',        // assuming 'book' field in Review points to Book._id
          as: 'reviews'
        }
      },
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' },
          reviewsCount: { $size: '$reviews' }
        }
      },
      { $skip: (page - 1) * parseInt(limit) },
      { $limit: parseInt(limit) },
      {
        $project: {
          title: 1,
          author: 1,
          genre: 1,
          averageRating: { $ifNull: ['$averageRating', 0] },
          reviewsCount: 1
        }
      }
    ]);

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('reviews');
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const reviews = await Review.find({ book: book._id });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

    res.json({ book, avgRating, reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.searchBooks = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter q is required' });
  }

  const regex = new RegExp(q, 'i');

  try {
    const books = await Book.aggregate([
      {
        $match: {
          $or: [
            { title: regex },
            { author: regex }
          ]
        }
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'book',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' },
          reviewsCount: { $size: '$reviews' }
        }
      },
      {
        $project: {
          title: 1,
          author: 1,
          genre: 1,
          averageRating: { $ifNull: ['$averageRating', 0] },
          reviewsCount: 1
        }
      }
    ]);

    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found matching your query' });
    }

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
