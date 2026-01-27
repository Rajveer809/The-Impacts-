# The Impacts - API Contracts

## Overview
This document outlines the API contracts for The Impacts marketing agency website.

## Base URL
- Backend: `${REACT_APP_BACKEND_URL}/api`

---

## 1. Contact Form Submission

### POST `/api/contact`
Save contact form submissions to database.

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "phone": "string (optional)",
  "service": "string (required) - seo | meta | social | all",
  "budget": "string (optional) - 1k-3k | 3k-5k | 5k-10k | 10k+",
  "message": "string (required)"
}
```

**Response (201):**
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string | null",
  "service": "string",
  "budget": "string | null",
  "message": "string",
  "created_at": "datetime"
}
```

**Error Response (422):**
```json
{
  "detail": [{"loc": ["body", "field"], "msg": "error message", "type": "error_type"}]
}
```

---

## 2. Newsletter Subscription

### POST `/api/newsletter`
Subscribe email to newsletter.

**Request Body:**
```json
{
  "email": "string (required, email format)"
}
```

**Response (201):**
```json
{
  "id": "string",
  "email": "string",
  "subscribed_at": "datetime"
}
```

**Error Response (409):**
```json
{
  "detail": "Email already subscribed"
}
```

---

## 3. Get Contact Submissions (Admin)

### GET `/api/contact`
Retrieve all contact form submissions.

**Response (200):**
```json
[
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string | null",
    "service": "string",
    "budget": "string | null",
    "message": "string",
    "created_at": "datetime"
  }
]
```

---

## Mock Data to Replace

### Contact Form (ContactSection component)
- Currently uses `setTimeout` to simulate API call
- Replace with actual POST to `/api/contact`

### Newsletter (Footer component)
- Currently has no backend integration
- Add POST to `/api/newsletter`

---

## Frontend Integration Notes

1. **Contact Form:**
   - File: `/app/frontend/src/components/LandingPage.jsx`
   - Function: `handleSubmit` in `ContactSection`
   - Replace mock timeout with axios POST

2. **Newsletter:**
   - File: `/app/frontend/src/components/LandingPage.jsx`
   - Component: `Footer`
   - Add form handler with axios POST

---

## MongoDB Collections

1. **contacts** - Contact form submissions
2. **newsletters** - Newsletter subscriptions
