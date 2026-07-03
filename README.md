# 🏠 RoomMatch AI — Rent & Flatmate Finder

> India's smartest AI-powered platform for finding verified rooms, PGs, and compatible flatmates.

![RoomMatch AI](https://img.shields.io/badge/RoomMatch-AI-6C47FF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTMgOWw5LTcgOSA3djExYTIgMiAwIDAxLTIgMkg1YTIgMiAwIDAxLTItMnoiIGZpbGw9IndoaXRlIi8+PC9zdmc+)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)

---

## ✨ Features

- 🔍 **Browse & Filter Listings** — Search rooms by city, type, budget, furnishing, and gender preference
- 🤖 **AI Compatibility Score** — AI analyses 20+ lifestyle factors to match tenants with listings
- 🤝 **Flatmate Finder** — Find compatible roommates with SVG score rings and habit tags
- 💬 **In-App Chat** — Secure messaging between tenants and owners after request acceptance
- 📊 **Owner Dashboard** — Post listings, manage interest requests, view analytics
- 📝 **Multi-Step Listing Form** — 4-step form with live preview before submitting
- 🤖 **AI Chatbot** — Floating RoomBot assistant to help users navigate the platform
- 🔒 **Role-Based Access** — Separate flows for Owners, Tenants, and Flatmate Seekers

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 8 | Build tool & dev server |
| React Router v7 | Client-side routing |
| Vanilla CSS | Custom design system |
| Google Fonts (Outfit + Inter) | Typography |

### Backend
| Tech | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database |
| JWT | Authentication |

---

## 📁 Project Structure

```
Rent Flatmate/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── components/        # Navbar, Footer, AIChatbot
│   │   ├── pages/             # All 9 pages with CSS
│   │   ├── data/              # Mock data (listings, flatmates, chat)
│   │   ├── App.jsx            # Router + layout shell
│   │   └── index.css          # Global design system
│   └── package.json
│
└── server/                    # Express backend
    ├── controllers/
    ├── models/                # User, Property schemas
    ├── routes/
    ├── middleware/
    ├── config/
    └── app.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas account (for backend)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/rent-flatmate.git
cd rent-flatmate
```

### 2. Setup the Frontend
```bash
cd client
npm install
npm run dev
```
Frontend runs at → **http://localhost:5173**

### 3. Setup the Backend
```bash
cd server
npm install

# Copy the env example and fill in your values
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=5000
JWT_SECRET=your_super_secret_key
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/rent-flatmate
```

```bash
node app.js
```
Backend runs at → **http://localhost:5000**

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary | `#6C47FF` (Violet) |
| Accent | `#00D4AA` (Teal) |
| Background | `#080C1A` (Deep Navy) |
| Font (Heading) | Outfit |
| Font (Body) | Inter |

---

## 📄 API Routes (Backend)

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & get JWT |
| GET | `/api/properties` | Get all listings |
| POST | `/api/properties` | Create listing (owner) |
| GET | `/api/properties/:id` | Get listing by ID |

---

## 📸 Pages

| Page | Route |
|---|---|
| Home | `/` |
| Find Rooms | `/listings` |
| Room Detail | `/listings/:id` |
| Flatmate Finder | `/flatmates` |
| Owner Dashboard | `/dashboard` |
| Post Listing | `/post-listing` |
| Chat | `/chat` |
| Login | `/login` |
| Register | `/register` |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📝 License

MIT © 2024 RoomMatch AI
