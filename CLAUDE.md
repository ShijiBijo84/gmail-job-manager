# Gmail Job Manager — CLAUDE.md

## Overview
This project manages job-related Gmail messages, classifies them using Ollama Claude model (ornith:9b), and exposes REST APIs for a React+TypeScript frontend.

## Tech Stack
- Node.js + Express + TypeScript (backend)
- Gmail API with OAuth2 for email access
- Ollama Claude (ornith:9b) for local email classification
- React + TypeScript + Vite (frontend)

## Development Approach
- server first: Setup Gmail fetching, local classification, and API endpoints.
- client second: Consume APIs, display emails, allow filtering.
- Use Ollama Claude via CLI calls inside backend services.
- Manually copy generated code from Claude sessions into project files.

## Coding Principles
- Strict TypeScript, no `any`, no `@ts-ignore`.
- Clean, focused functions, error handling everywhere.
- Secure storage of secrets (.env).
- Consistent REST API response format:
  