
# Gmail Job Manager

> An AI-powered Gmail application that transforms raw emails into a structured job application tracker using local LLM inference with Ollama.

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Express](https://img.shields.io/badge/Express-5-black)
![AI](https://img.shields.io/badge/LLM-Ollama%20%7C%20Groq%20%7C)

---

## Features

- Gmail OAuth 2.0 authentication
- Fetch and normalize Gmail messages
- AI-powered job email classification
- Confidence scoring for predictions
- Application status detection (applied, interview, rejected,  offer, unknown)
- Filterable inbox UI
- Shared TypeScript domain models
- Swappable AI providers (Ollama / Groq )

---

##  Screenshots

### Inbox Dashboard

Displays AI-enriched job emails in a clean inbox interface.

![Inbox Dashboard](docs/screenshots/inbox.png)
---

### Email Classification

Each email is enriched with:

- Application status
- AI confidence score
- Sender
- Preview snippet

![Email Card](docs/screenshots/filtered.png)

---

## System Overview

```text
                Gmail API
                    │
                    ▼
        Express Backend (TypeScript)
                    │
     Gmail Service • AI Classification Layer
                    │
   ┌───────────────────────────────┐
   │                               │
   ▼                               ▼
Ollama (Local LLM)        Groq API (Cloud LLM)
   │                               │
   └───────────────┬───────────────┘
                   ▼
        Structured Email Intelligence
                   │
                   ▼
        React + Tailwind Frontend
```

---

## AI Email Processing Pipeline

```text
Fetch Gmail Email
        │
        ▼
Normalize Email Data
        │
        ▼
AI Classification (Provider-based)
        │
        ▼
Extract Structured Job Status
        │
        ▼
Enrich Email Payload
        │
        ▼
Render Inbox UI
```

---

##  Tech Stack

### Backend

- Node.js
- Express
- TypeScript
- Gmail API
- OAuth 2.0
- Ollama (Local inference)
- Groq API (Cloud inference)

### Frontend

- React
- Vite
- Tailwind CSS
- shadcn/ui
- Axios

### Architecture
- Clean Architecture (Service + Provider pattern)
- AI Provider abstraction layer
- Shared TypeScript domain models
- Swappable LLM backend (Ollama ↔ Groq)

---

##  Project Structure

```text
packages/
├── client/        # React frontend
├── server/        # Express backend
└── shared/        # Shared types & models
```

---

##  Getting Started

### Backend

```bash
cd packages/server
npm install
npm run dev
```

### Frontend

```bash
cd packages/client
npm install
npm run dev
```

---

##  Why I Built This

Job-related emails are often buried inside cluttered inboxes, making it difficult to track applications, interviews, and rejections.

This project explores how AI can transform unstructured Gmail data into structured career intelligence using:

- Gmail integration
- Local LLM inference (Ollama)
- Cloud LLM inference (Groq)
- Clean UI design
- Strong TypeScript architecture

It demonstrates a production-style backend using an AI provider abstraction layer, allowing seamless switching between local and cloud models.

---

### AI Provider Strategy

This project supports two interchangeable LLM providers:

🟢 Ollama → Local inference (development & privacy-first mode)
🔵 Groq → Fast cloud inference (production demo mode)

The backend is designed so the AI layer can be swapped without changing business logic.

---

##  Roadmap

- ✅ Gmail OAuth
- ✅ AI classification
- ✅ Status detection
- ✅ Sidebar filtering
- ⏳ Company extraction
- ⏳ Role extraction
- ⏳ Search
- ⏳ PostgreSQL persistence
- ⏳ Analytics dashboard

---

