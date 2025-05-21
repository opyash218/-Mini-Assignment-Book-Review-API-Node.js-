
# Book Review API

This is a backend REST API for managing books and their reviews using **Node.js**, **Express.js**, **MongoDB**, and **JWT-based authentication**.

---

## 🚀 Features

* **User Authentication**: Signup and login using JWT.
* **Book Management**: Add, view, and filter books with pagination.
* **Reviews**: Authenticated users can post, update, and delete reviews.
* **Search Functionality**: Search books by partial title or author (case-insensitive).

---

## 📌 Project Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/opyash218/-Mini-Assignment-Book-Review-API-Node.js-.git
cd book-review-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create Environment Variables

Create a `.env` file in the root folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookreviewdb
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Start MongoDB (if local)

Ensure MongoDB is running:

```bash
mongod
```

### 5️⃣ Run the Server

```bash
npm start
```

> API will be available at: `http://localhost:5000/`

---

## 📢 API Endpoints

### 🔹 Auth Endpoints

#### Signup

**POST** `/api/auth/signup`

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "secret123"
}
```

*Response:*

```json
{
  "message": "User registered successfully"
}
```

#### Login

**POST** `/api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

*Response:*

```json
{
  "token": "<jwt_token>",
  "message": "Login successful"
}
```

---

### 🔹 Books Endpoints

#### Add a Book (Authenticated)

**POST** `/api/books`

```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "genre": "Fantasy"
}
```

*Headers:* `Authorization: Bearer <token>`

#### Get All Books

**GET** `/api/books?page=1&limit=5&author=tolkien&genre=fantasy`

#### Get Book by ID (with Reviews)

**GET** `/api/books/:id`

#### Search Books

**GET** `/api/books/search?q=harry`

---

### 🔹 Reviews Endpoints

#### Add Review (Authenticated)

**POST** `/api/books/:id/reviews`

```json
{
  "rating": 5,
  "comment": "Excellent read!"
}
```

*Headers:* `Authorization: Bearer <token>`

#### Update Review (Authenticated)

**PUT** `/api/reviews/:id`

```json
{
  "rating": 4,
  "comment": "Updated review"
}
```

#### Delete Review (Authenticated)

**DELETE** `/api/reviews/:id`

---

## 📂 Design Decisions & Assumptions

* **JWT Token on Signup/Login**: Token is returned immediately so user can access protected routes.
* **One Review per Book per User**: Prevents multiple reviews from the same user.
* **MongoDB**: Used for flexible and scalable document storage.
* **Error Handling**: Clean error responses and status codes.
* **Case-insensitive Search**: Uses regex for partial matches on title and author.

---

## 🌐 API Testing with Postman

* Base URL: `http://localhost:5000/api`
* Use the token returned from `/signup` or `/login` in `Authorization` header:

  * `Authorization: Bearer <token>`

---

## 🧱 Contact

For any issues or questions, contact: **yashsatyajit38@gmail.com**

---

