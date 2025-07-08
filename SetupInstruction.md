
# 📚 Book Catalog Web Application – Setup Instruction

This document provides setup guidelines and task division for our fullstack Book Catalog project.

---

## 📦 Project Structure

```
book-catalog-app/
│
├── BOOK-CATALOG-1/         # Express + MongoDB backend
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express route handlers
│   ├── middleware/         # Custom middleware
│   └── server.js           # Main server entry
│
├── web-book-catalog/       # React + Vite frontend
│   ├── src/components/     # React components
│   ├── src/store/          # Redux Toolkit store
│   ├── src/App.jsx         # Main App with router
│   └── vite.config.js      # Vite config
│
└── SetupInstruction.md     # This file
```

---

## 🛠 Setup Instructions

### 🔧 Backend Setup (`BOOK-CATALOG-1`)

1. **Install dependencies**
   ```bash
   cd BOOK-CATALOG-1
   npm install
   ```

2. **Environment Variables**

   Create a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/bookcatalog
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   EMAIL_SERVICE=gmail
   BASE_URL=http://localhost:5000
   ```

3. **Run the backend server**
   ```bash
   npm run dev
   ```

---

### 💻 Frontend Setup (`web-book-catalog`)

1. **Install dependencies**
   ```bash
   cd web-book-catalog
   npm install
   ```

2. **Run the frontend**
   ```bash
   npm run dev
   ```

3. **Access the app**  
   Visit: [http://localhost:5173](http://localhost:5173)

---

## 👥 Team Task Division

| Name     | Role / Tasks                                                                 |
|----------|------------------------------------------------------------------------------|
| **Sasa** | 🔹 Integrate MongoDB and Mongoose<br>🔹 Define Book model<br>🔹 Implement CRUD API |
| **Rivan**| 🔹 Setup JWT-based authentication<br>🔹 Google OAuth integration<br>🔹 Email verification logic |
| **Nabil**| 🔹 Design and build frontend UI with React + Vite<br>🔹 Develop navigation and layout |
| **Vania**| 🔹 Implement pagination in BookList<br>🔹 Create backend `authMiddleware` for route protection |

---

## ✅ Features Checklist

- [v] SPA using React Router
- [v] Global state with Redux Toolkit
- [v] Backend CRUD with MongoDB
- [v] JWT auth middleware
- [v] Google OAuth login
- [v] Email verification on signup
- [v] Pagination feature
- [v] Component-based UI

---

## 📝 Notes

- Do not commit `.env` to GitHub.
- Always pull the latest version before pushing your code.
- Make commits with clear and meaningful messages.

---
