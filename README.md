# -Mini-Assignment-Book-Review-API-Node.js-

# Book Review API

A RESTful API for managing books and reviews with JWT-based authentication.

---

## Tech Stack

- Node.js with Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT) for authentication

---

## Project Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd <your-project-folder>

Install dependencies

bash
Copy
Edit
npm install
Configure environment variables

Create a .env file in the root directory with the following variables:

env
Copy
Edit
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookreviewdb
JWT_SECRET=your_jwt_secret_key
Start MongoDB

Make sure your MongoDB server is running locally or provide a remote connection URI.

How to Run Locally
Start the server with:

bash
Copy
Edit
npm start
Server runs on http://localhost:5000

Example API Requests
1. User Registration (Signup)
bash
Copy
Edit
curl -X POST http://localhost:5000/api/signup \
-H "Content-Type: application/json" \
-d '{"username":"john", "email":"john@example.com", "password":"password123"}'
Response:

json
Copy
Edit
{
  "message": "User registered successfully",
  "token": "<jwt_token>"
}
2. User Login
bash
Copy
Edit
curl -X POST http://localhost:5000/api/login \
-H "Content-Type: application/json" \
-d '{"email":"john@example.com", "password":"password123"}'
Response:

json
Copy
Edit
{
  "message": "Login successful",
  "token": "<jwt_token>"
}
3. Add a Book (Authenticated)
bash
Copy
Edit
curl -X POST http://localhost:5000/api/books \
-H "Authorization: Bearer <jwt_token>" \
-H "Content-Type: application/json" \
-d '{"title":"The Hobbit", "author":"J.R.R. Tolkien", "genre":"Fantasy"}'
4. Get All Books (with optional filtering and pagination)
bash
Copy
Edit
curl "http://localhost:5000/api/books?author=J.K.%20Rowling&page=1&limit=10"
5. Get Book Details by ID
bash
Copy
Edit
curl http://localhost:5000/api/books/<book_id>


6. Add a Review to a Book (Authenticated)

curl -X POST http://localhost:5000/api/books/<book_id>/reviews \
-H "Authorization: Bearer <jwt_token>" \
-H "Content-Type: application/json" \
-d '{"rating":5, "comment":"Amazing book!"}'


7. Search Books by Title or Author

```bash
curl "http://localhost:5000/api/books/search?q=Auther-name or Book name"
```


Design Decisions and Assumptions

JWT Authentication:
Used for stateless authentication; tokens returned on signup/login and required for protected routes.

MongoDB with Mongoose:
Chosen for flexible schema and ease of handling nested documents (reviews linked to books).

Reviews linked to books:
Each review references a book by its ObjectId to allow aggregation and efficient lookups.

Endpoints structure:
Clear separation between books and reviews, with review operations nested under books.

Data validation and error handling:
Basic validation on required fields and proper HTTP status codes returned for errors.

Pagination:
Implemented on list endpoints to limit response size and improve performance.

Case-insensitive, partial search:
Search supports regex matching on title or author fields.

One review per user per book:
Enforced in backend to prevent duplicate reviews by the same user on a single book.
