# Gmail Job Manager

An AI-powered application that helps track job applications directly from Gmail. The project fetches emails using the Gmail API, classifies them with a local LLM running on Ollama, and presents a clean job-focused inbox.

## Features

* Gmail OAuth 2.0 authentication
* Fetch recent Gmail messages
* AI-powered job email classification
* Confidence scoring for each email
* REST API built with Express and TypeScript
* React + Vite frontend
* Local AI inference using Ollama

---

## Tech Stack

### Backend

* Node.js
* Express
* TypeScript
* Google Gmail API
* OAuth 2.0
* Ollama

### Frontend

* React
* Vite
* TypeScript
* Tailwind CSS
* Axios

---

## Project Structure

```text
gmail-job-manager/
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── app.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## Architecture

```text
Gmail
   │
   ▼
Gmail API
   │
   ▼
Express Backend
   │
   ├── OAuth Service
   ├── Gmail Service
   ├── AI Service (Ollama)
   └── REST API
   │
   ▼
React Frontend
```

---

## Backend Flow

```text
GET /emails/enriched
        │
        ▼
Fetch Gmail Messages
        │
        ▼
Normalize Email Data
        │
        ▼
Send to Ollama
        │
        ▼
AI Classification
        │
        ▼
Return Enriched Emails
```

---

## Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=4000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:4000/auth/google/callback
GOOGLE_REFRESH_TOKEN=
```

---

## Running the Backend

```bash
cd server
npm install
npm run dev
```

Server:

```
http://localhost:4000
```

Health check:

```
GET /api/health
```

---

## Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```
http://localhost:5173
```

---

## Current API

### Health

```
GET /api/health
```

### Google Login

```
GET /auth/google
```

### OAuth Callback

```
GET /auth/google/callback
```

### AI Enriched Emails

```
GET /emails/enriched
```

---

## AI Classification

The backend sends email metadata to a local Ollama model and returns structured output.

Example:

```json
{
  "isJobRelated": true,
  "confidence": 0.96
}
```

---

## Roadmap

* [x] Express backend
* [x] Gmail OAuth
* [x] Gmail API integration
* [x] AI email classification
* [x] React frontend
* [ ] Company extraction
* [ ] Role extraction
* [ ] Application status detection
* [ ] Search and filtering
* [ ] Persistent storage
* [ ] Dashboard analytics
* [ ] Deployment

---

## Disclaimer

This project is intended for educational and personal productivity purposes. It uses the Gmail API with user authorization and performs AI inference locally through Ollama.
