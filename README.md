# Event Management System

A full-stack Event Management application built with a modern decoupled 3-tier architecture. It allows users to create, browse, view details of, edit, and delete events, backed by a REST API, Prisma ORM, and PostgreSQL.

---

## Overview

The Event Management System provides complete end-to-end event scheduling and tracking. The system features a responsive React SPA frontend, a Node.js/Express REST backend, and database persistence using Prisma and PostgreSQL.

---

## Features

- **Create Events:** Clean form interface with client-side and server-side validation.
- **View All Events:** Interactive card list showing scheduled dates, summaries, and actions.
- **Search & Filter:** Instant client-side search across event titles and descriptions.
- **Event Details:** Dedicated view for each event displaying full descriptions and audit timestamps (`createdAt`, `updatedAt`).
- **Edit Events:** Pre-populated edit form to update existing events.
- **Delete Events:** Confirmation protection and instant UI synchronization.
- **Robust Error Handling:** Consistent JSON error envelopes, HTTP status codes, and user-friendly error banners.
- **Containerized Database:** One-command Docker Compose setup for PostgreSQL.

---

## Technology Stack

- **Frontend:** React 18, Vite, React Router v6, CSS Variables & modern responsive design
- **Backend:** Node.js, Express.js, CORS, Morgan logger, Dotenv
- **Database & ORM:** PostgreSQL, Prisma ORM (v5)
- **API Architecture:** RESTful JSON APIs
- **Infrastructure:** Docker Compose (local PostgreSQL)

---

## Project Structure

```
EventPlanner/
│
├── frontend/                     # React + Vite application
│   ├── public/
│   ├── src/
│   │   ├── components/           # Reusable UI components (Navbar, EventCard, EventForm, EventList, Loading)
│   │   ├── pages/                # Route pages (Home, Events, CreateEvent, EditEvent, EventDetails)
│   │   ├── services/             # API client (eventService.js)
│   │   ├── hooks/                # Custom React hooks (useEvents.js)
│   │   ├── utils/                # Date and helper utilities (dateFormatter.js)
│   │   ├── App.jsx               # App routing and shell
│   │   ├── main.jsx              # React DOM mounting
│   │   └── index.css             # Design tokens and styles
│   ├── .env                      # Frontend environment config
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                      # Node.js + Express API
│   ├── src/
│   │   ├── config/               # Database client config (database.js)
│   │   ├── controllers/          # HTTP request handlers (eventController.js)
│   │   ├── routes/               # Express route definitions (eventRoutes.js)
│   │   ├── services/             # Business & ORM logic (eventService.js)
│   │   ├── middleware/           # Validation and error handling
│   │   ├── utils/                # API response envelopes (response.js)
│   │   ├── app.js                # Express app setup
│   │   └── server.js             # HTTP server entry point
│   ├── prisma/
│   │   └── schema.prisma         # Prisma schema and Event model
│   ├── .env                      # Backend environment config
│   ├── .env.example
│   └── package.json
│
├── docs/                         # Detailed documentation
│   ├── API.md                    # REST API endpoints and payload specs
│   ├── DATABASE.md               # Schema, ER diagram, and migration instructions
│   └── PROJECT_PLAN.md           # Architecture flowcharts and deployment roadmap
│
├── docker-compose.yml            # Local PostgreSQL container service
├── .gitignore
├── README.md
└── package.json                  # Root orchestration scripts
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16.0.0 or higher)
- [npm](https://www.npmjs.com/) (v8.0.0 or higher)
- [Docker](https://www.docker.com/) & Docker Compose (or a running PostgreSQL instance)

---

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd EventPlanner
```

### 2. Install Dependencies

You can install all dependencies across root, backend, and frontend with:
```bash
npm run install:all
```

Or install separately:
```bash
# Backend dependencies
cd backend && npm install

# Frontend dependencies
cd ../frontend && npm install
```

---

## Environment Variables

### Backend Configuration (`backend/.env`)

Copy `backend/.env.example` to `backend/.env`:
```env
PORT=5000
DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5432/eventdb?schema=public"
FRONTEND_URL="http://localhost:5173"
NODE_ENV=development
```

### Frontend Configuration (`frontend/.env`)

Copy `frontend/.env.example` to `frontend/.env`:
```env
VITE_API_URL="http://localhost:5000/api"
```

---

## Database Setup

### 1. Launch PostgreSQL with Docker
```bash
docker compose up -d
```
This spins up PostgreSQL on port `5432` with database `eventdb`.

### 2. Run Prisma Migrations
```bash
cd backend
npx prisma migrate dev --name init_events
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

*(Optional)* Launch Prisma Studio visual browser:
```bash
npx prisma studio
```

---

## Running the Application

### 1. Start the Backend API
In the `backend` folder:
```bash
npm run dev
```
The API server will start at `http://localhost:5000` (Endpoints at `/api/events`).

### 2. Start the Frontend Application
In a separate terminal, inside the `frontend` folder:
```bash
npm run dev
```
The React development server will start at `http://localhost:5173`.

---

## API Documentation

For the full endpoint specifications, request payloads, and status codes, please refer to [`docs/API.md`](docs/API.md).

### Quick Summary of Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check endpoint |
| `GET` | `/api/events` | Retrieve all events (ordered by date) |
| `GET` | `/api/events/:id` | Retrieve single event by ID |
| `POST` | `/api/events` | Create a new event |
| `PUT` | `/api/events/:id` | Update an existing event |
| `DELETE` | `/api/events/:id` | Delete an event |

---

## Testing

### Manual Testing with cURL

#### Health Check:
```bash
curl http://localhost:5000/api/health
```

#### Create Event:
```bash
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Annual Tech Conference",
    "date": "2026-10-15",
    "details": "Technology conference covering modern web development, cloud, and AI."
  }'
```

#### List Events:
```bash
curl http://localhost:5000/api/events
```

#### Update Event:
```bash
curl -X PUT http://localhost:5000/api/events/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Annual Tech Conference - Updated",
    "date": "2026-10-16",
    "details": "Updated agenda and keynote speaker announcements."
  }'
```

#### Delete Event:
```bash
curl -X DELETE http://localhost:5000/api/events/1
```

---

## Deployment

Refer to [`docs/PROJECT_PLAN.md`](docs/PROJECT_PLAN.md) for full deployment instructions.

1. **Database:** Deploy a managed PostgreSQL instance (Neon, Supabase, AWS RDS, etc.).
2. **Backend:** Deploy to Render, Railway, or Fly.io. Configure `DATABASE_URL` and `FRONTEND_URL`. Run `npx prisma migrate deploy`.
3. **Frontend:** Build with `npm run build` and deploy static assets to Vercel, Netlify, or Cloudflare Pages. Set `VITE_API_URL` to point to your live backend domain.
