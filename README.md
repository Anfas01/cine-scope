# 🎬 CineScope

> A full-stack movie discovery application built with **Next.js 16**, **React 19**, **TypeScript**, **MongoDB**, and the **TMDB API**.

CineScope allows users to discover trending movies, search the TMDB catalog, view detailed movie information, and manage a personal watchlist with secure authentication.

## 🌐 Live Demo

👉 https://cine-scope-eight-wine.vercel.app/

## 📂 Repository

👉 https://github.com/Anfas01/cine-scope

---

## ✨ Features

- 🔐 Secure JWT Authentication
- 🎬 Browse Weekly Trending Movies
- 🔍 Search Movies using TMDB API
- 📄 Detailed Movie Pages
- ❤️ Personal Watchlist
- ⚡ Next.js Server Actions
- 🗄 MongoDB Database Integration
- 📱 Fully Responsive UI
- 🍪 HTTP-only Cookie Authentication
- 🚀 Optimized Image Loading with Next.js

---

## 🛠 Tech Stack

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Lucide React

### Backend

- Next.js Server Actions
- MongoDB
- Mongoose

### Authentication

- JWT
- bcrypt
- HTTP-only Cookies

### External API

- TMDB API

### Deployment

- Vercel

---

## 🏗 Architecture

```
User
   │
   ▼
Next.js App Router
   │
   ├── Server Components
   ├── Server Actions
   │
   ▼
Authentication (JWT)
   │
   ▼
MongoDB
   │
   ▼
TMDB API
```

---

## 📂 Project Structure

```
src
├── app/            # Routes & layouts
├── actions/        # Server Actions
├── components/     # Reusable UI
├── hooks/          # Custom hooks
├── lib/            # Utilities & helpers
├── models/         # Mongoose models
└── services/       # TMDB services
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/Anfas01/cine-scope.git
cd cine-scope
```

### Install dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file.

```env
TMDB_ACCESS_TOKEN=your_tmdb_access_token

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_secret
```

### Run Development Server

```bash
npm run dev
```

Open **http://localhost:3000**

---

## 📦 Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

## 💡 What I Learned

This project helped me gain practical experience with:

- Next.js App Router
- React Server Components
- Server Actions
- JWT Authentication
- MongoDB & Mongoose
- Protected Routes
- API Integration
- TypeScript
- Responsive UI Design
- Project Architecture

---

## 🚧 Challenges

Some of the challenges I solved while building CineScope:

- Implementing secure JWT authentication using HTTP-only cookies
- Building protected routes with the App Router
- Managing user-specific watchlists in MongoDB
- Integrating the TMDB API efficiently
- Structuring a scalable Next.js project

---

## 🔮 Future Improvements

- Google & GitHub OAuth
- User Profiles
- Movie Reviews & Ratings
- Infinite Scrolling
- Pagination
- Unit & Integration Testing
- Better Error Boundaries

---

## 🙌 Acknowledgements

- TMDB API
- Next.js
- MongoDB
- Vercel

---

## 👨‍💻 Author

**Anfas**

- GitHub: https://github.com/Anfas01
- Portfolio: *(Add your portfolio when available)*
- LinkedIn: *(Add your LinkedIn profile)*

---

⭐ If you found this project interesting, consider giving it a star!
