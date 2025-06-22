# 🎬 CineVault — Discover Your Next Favorite Film

> A modern, cinematic movie discovery platform built with Next.js 14, TypeScript, and Tailwind CSS.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TMDB](https://img.shields.io/badge/TMDB-API-01B4E4?style=for-the-badge&logo=themoviedatabase)](https://www.themoviedb.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-brightgreen?style=for-the-badge)](https://your-demo-url.vercel.app)

---

## ✨ Features

- 🎥 **Hero Section** — Featured trending movie with backdrop, rating, genres, and action buttons
- 🔥 **Trending Movies** — Toggle between daily and weekly trending, horizontal scroll row
- 🌟 **Popular & Top Rated** — Curated movie grids and rows with live TMDB data
- 🎭 **Genre Filter** — Color-coded genre badges to filter the popular movies grid
- 🔍 **Real-time Search** — Debounced search with instant results and pagination
- 🎬 **Movie Detail Page** — Full info: backdrop, poster, cast, trailer link, runtime, budget, revenue
- 📌 **Watchlist** — Add/remove movies, persisted in `localStorage`, grid + list views
- 💀 **Loading Skeletons** — Shimmer placeholders for all async content
- ⚠️ **Error States** — Graceful error UI with retry for all fetch failures
- 📱 **Fully Responsive** — Mobile, tablet, and desktop layouts
- 🌑 **Dark Cinematic Theme** — Glassmorphism cards, gradient overlays, smooth animations

---

## 📸 Screenshots

> _Screenshots section — add your own after running locally_

| Home | Movie Detail | Watchlist |
|------|-------------|-----------|
| ![Home](./screenshots/home.png) | ![Detail](./screenshots/detail.png) | ![Watchlist](./screenshots/watchlist.png) |

---

## 🚀 Getting Started

### 1. Get a TMDB API Key

1. Go to [https://www.themoviedb.org](https://www.themoviedb.org) and create a free account
2. Navigate to **Settings → API**
3. Request an API key (choose "Developer" for personal projects)
4. Copy your **API Key (v3 auth)**

### 2. Clone the Repository

```bash
git clone https://github.com/yourusername/movie-search-app.git
cd movie-search-app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root of the project:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your TMDB API key:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂 Project Structure

```
movie-search-app/
├── .env.example
├── .env.local              # your secrets (gitignored)
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── public/
│   └── placeholder.png
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── HomePageClient.tsx
    │   ├── globals.css
    │   ├── search/
    │   │   └── page.tsx
    │   ├── movie/
    │   │   └── [id]/
    │   │       └── page.tsx
    │   └── watchlist/
    │       └── page.tsx
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   └── Navigation.tsx
    │   ├── ui/
    │   │   ├── MovieCard.tsx
    │   │   ├── MovieCardSkeleton.tsx
    │   │   ├── MovieRow.tsx
    │   │   ├── HeroSection.tsx
    │   │   ├── GenreBadge.tsx
    │   │   ├── RatingStars.tsx
    │   │   ├── SearchBar.tsx
    │   │   ├── WatchlistButton.tsx
    │   │   └── ErrorState.tsx
    │   └── sections/
    │       ├── TrendingSection.tsx
    │       ├── PopularSection.tsx
    │       ├── TopRatedSection.tsx
    │       └── GenreFilter.tsx
    ├── hooks/
    │   ├── useWatchlist.ts
    │   ├── useDebounce.ts
    │   ├── useMovies.ts
    │   └── useTrending.ts
    ├── lib/
    │   ├── tmdb.ts
    │   ├── constants.ts
    │   └── utils.ts
    └── types/
        ├── movie.ts
        └── api.ts
```

---

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_TMDB_API_KEY` | Your TMDB v3 API key | ✅ Yes |

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 14 (App Router) | Framework, SSR, routing |
| TypeScript (strict) | Type safety |
| Tailwind CSS | Styling, animations |
| TMDB API | Movie data source |
| localStorage | Watchlist persistence |

---

## 📄 License

MIT © CineVault
