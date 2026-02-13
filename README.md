## Smart Bookmark Manager

### A full-stack real-time bookmark manager built with Next.js (App Router) and Supabase.Users can sign in with Google, add private bookmarks, and see updates in real-time across multiple tabs.

## 🚀 Live Demo

``` bash
smartbookmanager.vercel.app
```

## 🛠 Tech Stack

## Frontend: Next.js 14 (App Router)

## Backend: Supabase (Database + Auth + Realtime)

## Authentication: Google OAuth via Supabase

## Deployment: Vercel

## Styling: Tailwind CSS

## Built using:

- Supabase

- Vercel

- Google (OAuth Provider)

## ✨ Features

- 🔐 Google Login (No email/password)

- ➕ Add Bookmark (URL + Title required)

- 🔒 Private bookmarks per user

- ⚡ Real-time updates across multiple tabs

- 🌍 SSR compatible (Next.js App Router)

- 🚀 Production deployment ready

- 🏗 Architecture Overview

### User → Next.js (App Router) → Supabase Auth
### User → Next.js → Supabase Database
### Supabase Realtime → UI auto updates

## Bookmarks are stored with a user_id foreign key to ensure isolation between users.

## 📂 Database Schema

- Table: bookmarks
``` bash
Column	Type
id	uuid
title	text
url	text
user_id	uuid (FK → auth.users.id)
created_at	timestamp
```

- Row Level Security (RLS) enabled:

- Users can only read their own bookmarks

- Users can only insert their own bookmarks

## 🔑 Environment Variables

### Create .env.local:

- NEXT_PUBLIC_SUPABASE_URL=your-project-url
- NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

## ⚠️ When deploying to Vercel, these must be added in:

### Project → Settings → Environment Variables

## ⚙️ Installation & Setup
```bash
git clone <repo-url>
cd smart-bookmark-manager
npm install
npm run dev
```

Open:

### http://localhost:3000
## 🚀 Build for Production
``` bash
npm run build
npm start
```
## 📚 Lessons Learned

### During the development of this project, I gained hands-on experience in:

- 📘 Learning **Supabase** through official documentation and practical implementation
- 🗄️ Understanding SQL fundamentals including queries, relationships, and database structure
- 🔐 Implementing authentication using OAuth 2.0 principles
- 🔑 Configuring Google Authentication using Google Cloud Console
- 🧠 Debugging authentication and database issues through research and AI-assisted problem solving
- 📖 Strengthening my understanding of how modern backend services manage secure user data

### This project helped me build strong fundamentals in database management, authentication workflows, and third-party integrations.


### 🔥 Challenges Faced & Solutions
## 1️⃣ Issue: Empty Title & URL Were Being Saved

- Problem:
### Bookmarks were being saved even when title and URL were empty.

## Solution:

- Added required attribute in HTML form

- Added server-side validation before inserting into database

## 2️⃣ Issue: Hydration Mismatch Error (SSR vs Client)

### Error:

- A tree hydrated but some attributes of the server rendered HTML didn't match...

### Cause:
-Using client-side logic in SSR components.

## Solution:

- Separated client components using "use client"

- Avoided dynamic values during initial SSR render

## Lesson learned:

### In Next.js App Router, always separate Server and Client logic carefully.

## 3️⃣ Issue: Supabase Environment Variables Not Found (Vercel)

- Error:

- @supabase/ssr: Your project's URL and API key are required

## Cause:
- Environment variables were:

- Not prefixed with NEXT_PUBLIC_

- Not added in Vercel dashboard

- Had spaces and quotes in .env.local


## 4️⃣ Issue: Real-time Updates Not Syncing

### Cause:
- Missing Supabase realtime subscription cleanup.

## Solution:

- Subscribed to postgres_changes

- Properly unsubscribed on component unmount

## 📚 What I Learned

### How SSR works in Next.js App Router Supabase Auth + RLS policies Handling environment variables securely Debugging production deployment issues Real-time subscriptions in web apps Proper separation of client and server logic

# 📈 Future Improvements

- Edit & delete bookmarks

- Tagging system

- Bookmark categories

- Search & filtering

- Pagination

- Dark mode

- Rate limiting

# 👨‍💻 Author

## Yaswanth Palivela

### Full Stack Developer (MERN + Next.js)
