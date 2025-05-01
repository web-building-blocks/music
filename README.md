# 🎵 Music Dashboard

A modern music browsing and management web application built with **Next.js **, **ShadCN UI**, and **MongoDB**. Users can explore curated albums, add new music dynamically, and enjoy a clean, responsive interface.

---

## Features

- Explore "Listen Now" and "Made for You" albums
- Add new music via interactive dialog
- Real-time updates without page reload
- Cover URL validation with user feedback
- Fully modular UI with ShadCN (Radix UI + Tailwind CSS)
- MongoDB integration for persistent data storage

---

## Tech Stack

| Layer        | Technology                  |
|-------------|------------------------------|
| Frontend     | Next.js 15 (App Router)     |
| UI Components| ShadCN (Radix UI + Tailwind)|
| State        | React `useState`, `useRouter` |
| Backend      | Next.js API Routes (App Router) |
| Database     | MongoDB (via `mongodb` package) |

---

## Project Structure

```
music-dashboard/
├── app/
│   ├── api/music/route.ts        # POST handler for new music
│   ├── listen-now/page.tsx       # Music page layout
├── components/
│   ├── add-music.tsx             # Dialog form to add music
│   ├── album-artwork.tsx         # Album display component
│   └── ui/                       # ShadCN UI components
├── lib/mongo.ts                  # MongoDB client + helpers
├── public/                       # Static files
├── scripts/seed.ts               # Optional DB seeding script
├── .env                          # Local environment config
├── next.config.js                # Next.js configuration
└── README.md
```

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/music-dashboard.git
cd music-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root:

```
MONGODB_URI=mongodb://localhost:27017
```

### 4. Seed initial data

```bash
npx tsx scripts/seed.ts
```

### 5. Run the development server

```bash
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000/listen-now)

---



## API Reference

### `POST /api/music`

**Request Body:**

```json
{
  "name": "Song Title",
  "artist": "Artist Name",
  "cover": "https://example.com/image.jpg"
}
```

**Response:**

- `201 Created`: `{ insertedId: "...mongoId" }`
- `500 Error`: `{ error: "Insert failed" }`

---

