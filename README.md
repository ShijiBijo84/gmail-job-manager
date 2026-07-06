
# Gmail Job Manager

> An AI-powered Gmail application that transforms raw emails into a structured job application tracker using local LLM inference with Ollama.

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Express](https://img.shields.io/badge/Express-5-black)
![AI](https://img.shields.io/badge/LLM-Ollama%20%7C%20Groq%20%7C)

---

##  Why I Built This

Job application emails quickly become scattered across a busy inbox, making it difficult to track progress.

This project explores how AI can transform unstructured Gmail data into structured application insights by combining Gmail integration, local LLM inference, and a clean frontend experience.

It also served as an opportunity to practice building a full-stack TypeScript application with shared domain models, service-oriented backend architecture, and AI-powered data enrichment.

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

Job application emails quickly become scattered across a busy inbox, making it difficult to track progress.

This project explores how AI can transform unstructured Gmail data into structured application insights by combining Gmail integration, local LLM inference, and a clean frontend experience.

It also served as an opportunity to practice building a full-stack TypeScript application with shared domain models, service-oriented backend architecture, and AI-powered data enrichment.

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

