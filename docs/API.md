# Event Management System — REST API Documentation

This document describes the REST API endpoints provided by the backend service.

## Base URL

- **Development:** `http://localhost:5000/api`
- **Production:** `https://api.your-domain.com/api`

## Response Format

All responses follow a consistent JSON envelope structure:

### Success Response
```json
{
  "success": true,
  "message": "Human readable message",
  "data": { ... } // or [ ... ]
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ] // Optional detailed field validation errors
}
```

---

## HTTP Status Codes

| Code | Description |
|---|---|
| `200 OK` | Request succeeded. Returns requested resource or update confirmation. |
| `201 Created` | Resource created successfully. |
| `400 Bad Request` | Client error (invalid payload, missing fields, invalid date). |
| `404 Not Found` | Requested resource could not be found. |
| `500 Internal Server Error` | Unexpected server failure. |

---

## Endpoints

### 1. Health Check

Verifies server status.

- **URL:** `/health`
- **Method:** `GET`
- **Response:** `200 OK`
```json
{
  "success": true,
  "message": "Event Management API is healthy",
  "timestamp": "2026-09-26T17:15:00.000Z"
}
```

---

### 2. Get All Events

Retrieves a list of all events, sorted by date in ascending order.

- **URL:** `/events`
- **Method:** `GET`
- **Response:** `200 OK`
```json
{
  "success": true,
  "message": "Events retrieved successfully",
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Annual Tech Conference",
      "date": "2026-10-15T00:00:00.000Z",
      "details": "Technology conference for developers covering modern web development, cloud technologies and AI.",
      "createdAt": "2026-09-26T10:30:00.000Z",
      "updatedAt": "2026-09-26T11:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Company Meetup",
      "date": "2026-10-20T00:00:00.000Z",
      "details": "Annual company meetup with team building sessions.",
      "createdAt": "2026-09-26T12:00:00.000Z",
      "updatedAt": "2026-09-26T12:00:00.000Z"
    }
  ]
}
```

---

### 3. Get Event by ID

Retrieves details for a single event by its numerical ID.

- **URL:** `/events/:id`
- **Method:** `GET`
- **URL Params:** `id=[integer]`

#### Success Response (`200 OK`):
```json
{
  "success": true,
  "message": "Event retrieved successfully",
  "data": {
    "id": 1,
    "name": "Annual Tech Conference",
    "date": "2026-10-15T00:00:00.000Z",
    "details": "Technology conference for developers covering modern web development, cloud technologies and AI.",
    "createdAt": "2026-09-26T10:30:00.000Z",
    "updatedAt": "2026-09-26T11:00:00.000Z"
  }
}
```

#### Error Responses:
- `400 Bad Request` (Invalid ID format):
```json
{
  "success": false,
  "message": "Invalid event ID. Must be a positive integer"
}
```
- `404 Not Found`:
```json
{
  "success": false,
  "message": "Event with ID 999 not found"
}
```

---

### 4. Create Event

Creates a new event record.

- **URL:** `/events`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "Annual Tech Conference",
  "date": "2026-10-15",
  "details": "Technology conference for developers covering modern web development, cloud technologies and AI."
}
```

#### Field Specifications:
- `name` (String, Required): 1 to 200 characters.
- `date` (String, Required): ISO 8601 string or valid date format (e.g., `YYYY-MM-DD`).
- `details` (String, Required): Non-empty text description.

#### Success Response (`201 Created`):
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "id": 1,
    "name": "Annual Tech Conference",
    "date": "2026-10-15T00:00:00.000Z",
    "details": "Technology conference for developers covering modern web development, cloud technologies and AI.",
    "createdAt": "2026-09-26T10:30:00.000Z",
    "updatedAt": "2026-09-26T10:30:00.000Z"
  }
}
```

#### Error Response (`400 Bad Request`):
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Event name is required and must not exceed 200 characters",
    "Valid event date is required",
    "Event details are required"
  ]
}
```

---

### 5. Update Event

Updates an existing event record by ID.

- **URL:** `/events/:id`
- **Method:** `PUT`
- **Headers:** `Content-Type: application/json`
- **URL Params:** `id=[integer]`
- **Request Body:**
```json
{
  "name": "Annual Tech Conference - Revised",
  "date": "2026-10-18",
  "details": "Updated schedule and keynote speakers."
}
```

#### Success Response (`200 OK`):
```json
{
  "success": true,
  "message": "Event updated successfully",
  "data": {
    "id": 1,
    "name": "Annual Tech Conference - Revised",
    "date": "2026-10-18T00:00:00.000Z",
    "details": "Updated schedule and keynote speakers.",
    "createdAt": "2026-09-26T10:30:00.000Z",
    "updatedAt": "2026-09-26T11:45:00.000Z"
  }
}
```

#### Error Responses:
- `400 Bad Request` (Validation errors or invalid ID)
- `404 Not Found` (Event does not exist)

---

### 6. Delete Event

Deletes an event record permanently.

- **URL:** `/events/:id`
- **Method:** `DELETE`
- **URL Params:** `id=[integer]`

#### Success Response (`200 OK`):
```json
{
  "success": true,
  "message": "Event deleted successfully",
  "data": {
    "id": 1
  }
}
```

#### Error Responses:
- `400 Bad Request` (Invalid ID format)
- `404 Not Found` (Event not found)
