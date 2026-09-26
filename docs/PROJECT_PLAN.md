# Event Management System — Project Plan & Architecture

## 1. System Architecture

The Event Management System is structured as a decoupled 3-tier web application:

```
┌────────────────────────────────────────────────────────┐
│                   CLIENT BROWSER                       │
│                                                        │
│  React 18 + Vite (SPA)                                 │
│  ├── React Router v6 (SPA routing)                     │
│  ├── Component Layer (Navbar, EventCard, EventForm...) │
│  └── Services Layer (eventService API client)          │
└───────────────────────────┬────────────────────────────┘
                            │
                     REST / HTTP JSON
                            │
┌───────────────────────────▼────────────────────────────┐
│                    NODE.JS BACKEND                     │
│                                                        │
│  Express Application                                   │
│  ├── Routes (/api/events)                              │
│  ├── Middleware (CORS, JSON Parser, Validation)        │
│  ├── Controllers (Request / Response formatting)       │
│  ├── Services (Data access & business logic)           │
│  └── Error Handler (Centralized exception handling)    │
└───────────────────────────┬────────────────────────────┘
                            │
                       Prisma ORM
                            │
┌───────────────────────────▼────────────────────────────┐
│                  DATABASE STORAGE                      │
│                                                        │
│  PostgreSQL Database (events table)                    │
└────────────────────────────────────────────────────────┘
```

---

## 2. Request / Response Lifecycle

1. **Client Action:** The user fills the Event Form and clicks "Create Event".
2. **Client Validation:** Form validates inputs before dispatching.
3. **HTTP Request:** React calls `eventService.createEvent(payload)` via `fetch` to `POST /api/events`.
4. **Backend Route:** Express passes the request to `/api/events` router.
5. **Validation Middleware:** `validateEvent` checks presence, data types, lengths, and valid date formats. Returns `400` if invalid.
6. **Controller:** `eventController.createEvent` receives validated payload and invokes `eventService`.
7. **Service & ORM:** `eventService.createEvent` executes `prisma.event.create(...)` against PostgreSQL.
8. **HTTP Response:** The record is formatted through standard `response.js` envelope and sent with `201 Created`.
9. **UI Update:** The React page updates state and redirects user to `/events` or shows a success toast.

---

## 3. Security Considerations

- **Input Validation:** Backend validation prevents malformed data or parameter tampering.
- **SQL Injection Prevention:** Prisma ORM utilizes parameterized queries exclusively.
- **CORS Protection:** Configurable whitelist via `FRONTEND_URL` environment variable.
- **Sensitive Data Isolation:** Database credentials and port numbers managed strictly via `.env`.
- **Payload Limits:** Body parsing configured with reasonable limits (`10kb`) to mitigate payload flooding.
- **Graceful Error Masking:** Stack traces and internal database errors are logged on the server and hidden from client responses in production.

---

## 4. Deployment Roadmap

```
                    INTERNET (HTTPS)
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
       FRONTEND HOST                 BACKEND HOST
    (Vercel / Netlify / S3)       (Render / Railway / Fly.io)
     React Vite Static Build         Node.js Express App
             │                             │
             └──────────────┬──────────────┘
                            │
                            ▼
                    MANAGED DATABASE
             (Neon / Supabase / AWS RDS)
                     PostgreSQL
```

### Steps for Deployment:
1. **Database:** Provision managed PostgreSQL (e.g. Neon, Supabase, or AWS RDS) and obtain connection string.
2. **Backend:** Deploy to Render/Railway/Fly.io. Configure `DATABASE_URL` and `FRONTEND_URL` in environment variables. Run `npx prisma migrate deploy`.
3. **Frontend:** Deploy to Vercel/Netlify. Set `VITE_API_URL` pointing to backend production URL.
