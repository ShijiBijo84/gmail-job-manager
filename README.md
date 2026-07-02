
# Gmail Job Manager

An AI-powered system that turns Gmail into a structured job application tracker using local LLM inference (Ollama).

It fetches emails, classifies job-related messages, and presents them in a clean, filterable inbox UI.

---

# Why I Built This

Job searching often becomes overwhelming when important emails are buried inside a cluttered inbox. I wanted to solve a simple but real problem: **turn unstructured Gmail data into a clear, actionable job tracking system.**

Instead of building another job board or tracker from scratch, I focused on the data already being generated — email communication — and asked:

> _Can an inbox become a structured job application dashboard using AI?_

# System Overview

Gmail Job Manager is a full-stack TypeScript monorepo that processes Gmail data and enriches it using AI.

The system is divided into three layers:

* **Ingestion Layer** → Gmail API (email fetching via OAuth)
* **Intelligence Layer** → Express backend + Ollama LLM
* **Presentation Layer** → React + Tailwind UI

```text
Gmail API → Backend (Express + TS) → Ollama AI → React UI
```
---

##  Documentation

Full project documentation is available in `/docs`:

- [Architecture](docs/architecture.md)
- [Design Decisions](docs/design-decisions.md)
- [Screenshots](docs/screenshots.md)

#  Disclaimer

This project is built for educational and portfolio purposes.
It uses Gmail API with user consent and performs local AI inference using Ollama.

---
