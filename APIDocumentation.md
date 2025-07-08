
# 📘 Book Catalog – API Documentation

This document describes the available API endpoints for the Book Catalog backend server built with Express.js and MongoDB.

---

## 🔐 Authentication Endpoints

### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
- `201 Created` – User created, verification email sent.
- `400 Bad Request` – Missing or invalid input.
- `409 Conflict` – Email already registered.

---

### POST `/api/auth/login`
Login user and receive a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "token": "jwt_token_here"
}
```

- `200 OK` – Login successful.
- `401 Unauthorized` – Invalid credentials.

---

### GET `/api/auth/google`
Initiate Google OAuth login flow.

**Response:**
- Redirects to Google login.

---

### GET `/api/auth/verify-email/:token`
Verify user email.

**Response:**
- `200 OK` – Email verified.
- `400 Bad Request` – Invalid or expired token.

---

## 📚 Book Endpoints

All book routes (except `GET`) require authentication with a valid JWT token in the header:

```
Authorization: Bearer <your_token_here>
```

---

### GET `/api/books?page=1&limit=5`
Fetch paginated list of books.

**Query Parameters:**
- `page`: page number (default: 1)
- `limit`: items per page (default: 5)

**Response:**
```json
{
  "total": 25,
  "page": 1,
  "totalPages": 5,
  "data": [ ... ]
}
```

---

### POST `/api/books`
Create a new book entry.

**Request Body:**
```json
{
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "year": 1949,
  "rating": 4.8,
  "pages": 328,
  "description": "Classic novel"
}
```

**Response:**
- `201 Created` – Book saved
- `400 Bad Request` – Invalid input
- `401 Unauthorized` – Missing/invalid token

---

### PUT `/api/books/:id`
Update a book by ID.

**Response:**
- `200 OK` – Book updated
- `403 Forbidden` – Unauthorized update attempt
- `404 Not Found` – Book not found

---

### DELETE `/api/books/:id`
Delete a book by ID.

**Response:**
- `200 OK` – Book deleted
- `403 Forbidden` – You’re not the owner
- `404 Not Found` – Book doesn’t exist

---

## ❗ Common Error Codes

| Code | Meaning |
|------|---------|
| `200` | OK – Success |
| `201` | Created – New resource added |
| `400` | Bad Request – Validation or input error |
| `401` | Unauthorized – Missing or invalid JWT |
| `403` | Forbidden – Access denied |
| `404` | Not Found – Resource doesn’t exist |
| `409` | Conflict – Duplicate email or data |
| `500` | Internal Server Error |

---

## 🛡️ Roles & Permissions (if implemented)

| Role     | Description                            |
|----------|----------------------------------------|
| `user`   | Default role. Can add/view own books.  |
| `editor` | Can edit and delete any book.          |
| `admin`  | Full access to all endpoints.          |

> If roles are implemented in your app, include role-based checks in middleware.

---

## 🔧 Tips

- Always send `Content-Type: application/json` in headers when sending data.
- Secure your `.env` and never commit it to GitHub.
- Use a REST client (like Postman or Thunder Client) to test endpoints.

---
