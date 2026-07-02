
#  Architecture Overview

Gmail Job Manager is a full-stack system that transforms raw Gmail data into structured job application insights using AI classification.

The architecture follows a **3-layer separation model**:

* Data Layer (Gmail API)
* Intelligence Layer (Backend + Ollama)
* Presentation Layer (React UI)

---

#  High-Level System Design

```text id="arch1"
                ┌────────────────────┐
                │     Gmail API      │
                └─────────┬──────────┘
                          │ OAuth2
                          ▼
        ┌────────────────────────────────┐
        │     Express Backend (TS)       │
        │───────────────────────────────│
        │ • Gmail Service               │
        │ • Email Normalization         │
        │ • AI Classification (Ollama)  │
        │ • Enrichment Layer            │
        └────────────┬──────────────────┘
                     │ EnrichedEmail[]
                     ▼
        ┌────────────────────────────────┐
        │      React Frontend           │
        │───────────────────────────────│
        │ • Inbox View                 │
        │ • Sidebar Filters            │
        │ • Email Cards                │
        └────────────────────────────────┘
```

---

#  Data Flow Architecture

The system is built around a **deterministic transformation pipeline**:

```text id="arch2"
Gmail Email (Raw)
        ↓
Normalization Layer
        ↓
Clean Email Object
        ↓
AI Classification (Ollama)
        ↓
EnrichedEmail Object
        ↓
Frontend Rendering
```

---

#  Backend Architecture

The backend is responsible for **data fetching + AI enrichment**.

## Responsibilities

* Gmail OAuth authentication
* Fetching emails from Gmail API
* Cleaning and normalizing email data
* Sending structured input to Ollama
* Returning enriched responses

## Internal Layers

```text id="arch3"
Controller Layer
    ↓
Service Layer
    ↓
Gmail Service
    ↓
AI Service (Ollama)
```

---

## 1. Gmail Service

* Fetches raw messages
* Extracts:

  * subject
  * sender
  * date
  * snippet

---

## 2. Normalization Layer

* Removes HTML encoding
* Standardizes email shape
* Ensures consistent DTO format

---

## 3. AI Service (Ollama)

Takes normalized email input:

```json id="arch4"
{
  "subject": "...",
  "from": "...",
  "snippet": "..."
}
```

Returns structured classification:

```json id="arch5"
{
  "isJobRelated": true,
  "confidence": 0.92,
  "status": "interview"
}
```

---

## 4. Enrichment Layer

Final transformation:

```ts id="arch6"
{
  email,
  classification
}
```

---

#  Frontend Architecture

The frontend is a **pure presentation layer**.

## Responsibilities

* Fetch enriched emails from backend
* Maintain filter state
* Render inbox UI

---

## State Flow

```text id="arch8"
API → InboxPage → Layout → Sidebar + Inbox
                      ↓
               Filter State
                      ↓
               Filtered Emails
```

---

#  Shared Package (Domain Layer)

The `shared` package acts as the **single source of truth**.

## Contains:

* `JobEmail`
* `EmailClassification`
* `EnrichedEmail`
* `ApplicationStatus`

---

## Why it matters

* Prevents backend/frontend type drift
* Ensures consistent API contracts
* Centralizes domain logic

---

#  Key Design Principles

## 1. Separation of Concerns

* Gmail API ≠ business logic
* AI ≠ UI logic
* UI ≠ data processing

---

## 2. AI Isolation

AI is fully backend-contained:

> Frontend never talks to LLM directly

This ensures:

* security
* consistency
* predictable output

---

## 3. Deterministic Pipeline

Every email follows the same transformation steps:

> Raw → Clean → AI → Enriched → UI

No randomness in structure.

---

## 4. Shared Domain Model

All entities are defined in one place:

> `packages/shared`

---

# Scalability Notes (Future Improvements)

The architecture is designed to support:

* persistent database layer (Postgres)
* background job processing (queue-based AI)
* caching layer (Redis)
* multi-user support

---

# Summary

This system is designed as:

> A deterministic AI pipeline that transforms unstructured Gmail data into structured job application intelligence.

It cleanly separates:

* data ingestion
* AI reasoning
* UI presentation

