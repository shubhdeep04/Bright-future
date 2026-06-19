# Bright Futures Foundation — Education NGO Website

A full-stack NGO website built with React (Vite + Tailwind CSS v4) on the frontend
and Node.js + Express + MongoDB on the backend.

## 📁 Project Structure

```
ngo-website/
├── backend/                 # Express + MongoDB API
│   ├── config/db.js
│   ├── models/              # Mongoose schemas
│   ├── controllers/         # Route handlers
│   ├── routes/              # API routes
│   ├── middleware/          # Auth + error handling
│   ├── uploads/             # Local file uploads (created at runtime)
│   ├── seed.js              # Seeds admin user + sample data
│   ├── server.js            # App entry point
│   └── .env                 # Environment variables
│
└── frontend/                 # React + Vite + Tailwind
    ├── src/
    │   ├── components/       # Navbar, Footer, shared UI
    │   ├── context/          # Auth & Site Content contexts
    │   ├── pages/             # All public pages
    │   ├── pages/admin/       # Admin panel pages
    │   ├── utils/api.js       # Axios instance
    │   ├── App.jsx            # Routes
    │   └── index.css          # Design tokens (Tailwind v4 @theme)
    └── vite.config.js         # Dev proxy to backend on :5000
```

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
```

Edit `.env` and set your **MongoDB Atlas** connection string:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ngo_education?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
```

Seed the database (creates admin user + sample campaign/event/testimonials):

```bash
npm run seed
```

This creates an admin account:
- **Email:** admin@brightfutures.org
- **Password:** Admin@123

Start the backend:

```bash
npm run dev
```

Backend runs on **http://localhost:5000**

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173** and proxies `/api` requests to the
backend automatically (see `vite.config.js`).

## 🔑 Key Features Implemented

- **Public pages:** Home, About, Programs, Donate, Volunteer, Events, Gallery,
  Blog, Contact
- **Auth:** Register/Login with JWT, role-based access (admin, donor, volunteer, user)
- **Donations:** Amount selection, campaign selection, mock payment confirmation
  flow (ready to wire to Razorpay), receipt generation
- **Volunteer registration:** skills, availability, interest area
- **Events:** upcoming/past listing + registration
- **Gallery:** photo/video grid with lightbox, category filters
- **Donor Dashboard:** donation history + printable receipts (80G)
- **Volunteer Dashboard:** assigned activities, attendance, certificate download
- **Admin Panel** (`/admin`, admin login required):
  - Dashboard analytics (totals, charts via Recharts)
  - Site Content Editor — edit hero text, mission/vision, stats, founder
    message, etc. (reflected live on the public site)
  - Donations (filter, export CSV, delete)
  - Campaigns (CRUD + live progress bars)
  - Volunteers (approve/reject, assign activities, issue certificates)
  - Events (CRUD + view registrations)
  - Gallery (add/remove photos & videos)
  - Blog (CRUD posts)
  - Testimonials (approve/hide/delete)
  - Contact Queries (status tracking)
  - Users (role management)

## 💳 Payment Integration (Razorpay)

The donation flow currently **simulates** a successful payment for demo
purposes (`PUT /api/donations/:id/confirm`). To go live:

1. Add your Razorpay Key ID/Secret to `backend/.env`
2. Create a server-side order creation endpoint using `razorpay` SDK
3. On the frontend (`Donate.jsx`), open the Razorpay Checkout widget with the
   order ID, then call `/donations/:id/confirm` with the real `payment_id`
   and `order_id` returned by Razorpay on success.

## 🎨 Design System

Defined in `frontend/src/index.css` under `@theme` (Tailwind v4 CSS-based config):

- **Colors:** Ink (#1E3A5F), Marigold (#F4A636), Terracotta (#D9683C),
  Leaf (#2D5F4C), Paper (#FBF6EC)
- **Fonts:** Fraunces (display/headings), Lexend (body)
- Custom utilities: `.ruled-bg` (notebook lines), `.marker-underline`
  (highlighter effect), `.hover-lift` (card hover animation)

## 📦 Image Uploads

`POST /api/upload` (admin only, multipart/form-data, field name `file`) saves
files to `backend/uploads/` and returns a relative URL. Use this URL in the
Gallery/Event/Blog/Campaign image fields, or paste any external image URL
directly.

## 🛡️ Default Roles

- `admin` — full access to `/admin`
- `donor` — default role for registered users, sees Donor Dashboard
- `volunteer` — assigned after admin approves volunteer application + role
  update from Admin > Users
- `user` — base role on registration
