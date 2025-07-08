
# 📚 Book Catalog – Fullstack Web Application

A creative and collaborative fullstack web app built with **React**, **Redux Toolkit**, **Express.js**, and **MongoDB** to manage your personal and public book collection.

---

## 🚀 Features

- 📘 Browse and search books by title or author
- 🔍 Filter books by genre
- 📑 Pagination support for easy browsing
- ➕ Add your own books to the collection
- 🧾 View book details and stats
- 🗑 Remove books from your personal list
- 🛡 Protected API routes using JWT middleware
- 🔐 User authentication with JWT
- 🌐 Google OAuth login *(in progress)*
- 📧 Email verification on signup *(in progress)*

---

## 🖼 Preview

![Book Catalog UI Preview](preview-image.png) *(optional)*

---

## 🛠 Tech Stack

### Frontend
- React + Vite
- React Router DOM
- Redux Toolkit
- Custom CSS

### Backend
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- Nodemailer for email verification 
- Passport Google OAuth 

---

## 📦 Project Structure

```
book-catalog-app/
├── BOOK-CATALOG-1/          # Express.js backend
├── web-book-catalog/        # React frontend
├── SetupInstruction.md      # Setup steps
└── README.md                # This file
```

---

## 🧪 How to Run (Quick Start)

```bash
# Backend
cd BOOK-CATALOG-1
npm install
npm run dev

# Frontend
cd web-book-catalog
npm install
npm run dev
```

> Access app at: http://localhost:5173

---

## 👥 Team Members

| Name     | Role / Contribution                                                  |
|----------|----------------------------------------------------------------------|
| **Sasa** | MongoDB integration, Mongoose model, CRUD API                        |
| **Rivan**| JWT authentication, Google OAuth setup, Email verification system    |
| **Nabil**| Frontend layout & navigation, React component structure              |
| **Vania**| Pagination logic, Middleware for protected backend routes            |

---

## 📌 To Do

- [v] Complete Google OAuth integration
- [v] Implement email verification flow
- [v] Add user registration & login pages
- [v] Improve unit testing coverage
- [v] Deploy on AWS / Render / Vercel

---

## ⚠️ Notes

- Keep `.env` files secret (do not push to GitHub)
- Use meaningful commit messages
- Follow naming conventions and code formatting

---

## 📄 License

MIT License – Free to use and modify.
