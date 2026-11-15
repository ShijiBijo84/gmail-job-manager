# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview
Gmail Job Manager fetches recent Gmail messages, classifies each one with an LLM (job-related or not, confidence 0–1, application status), and shows them in a filterable React inbox. It is an npm workspaces monorepo: `packages/server` (Express API), `packages/client` (React + Vite + Tailwind + shadcn/ui), `packages/shared` (TypeScript types only).

## Commands
Run from the repo root unless noted.

- `npm install`: install all workspaces
- `npm run dev`: run the server (tsx watch, port 4000) and client (Vite, port 5173) together via `concurrently`
- `npm run dev --workspace=server` / `npm run dev --workspace=client`: run one side only
- `npm run build`: build all workspaces. Build `shared` first (`npm run build --workspace=packages/shared`), or the server's `tsc` fails with "Cannot find module '@gmail-job-manager/shared'".
- `npm run build --workspace=packages/server`: type-check and compile the server (this is the server type check)
- `npm run lint --workspace=client`: ESLint (client only, server has no linter)
- `docker build -t gmail-job-manager-server .`: production image (server and the built client in one container, port 4000)
- `docker run --env-file .env -p 4000:4000 gmail-job-manager-server`

There is no test suite.

## Environment
- `dotenv.config()` reads `.env` from the process cwd. Under `npm run dev` that is **`packages/server/.env`**. Docker uses the **root `.env`** via `--env-file`. Keep both in sync (especially `GOOGLE_REFRESH_TOKEN`).
- Variables: `PORT`, `AI_MODEL` (`groq` or anything else → Ollama), `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`, `GOOGLE_REFRESH_TOKEN`, `GROQ_API_KEY`, optional `GROQ_MODEL` (default `openai/gpt-oss-120b`).
- `.dockerignore` must keep excluding `**/.env`, because `COPY packages/server` would otherwise put secrets in the image.
- Gmail fails with `invalid_grant` when the refresh token expires (every 7 days while the Google OAuth app is in "Testing" mode). To get a new one, open `http://localhost:4000/auth/google`, sign in, and copy `refresh_token` from the callback JSON into both `.env` files. Restart the server, because env is only read at startup.
- If port 4000 is answering but the dev server's logs show nothing, an old Docker container (`server`) may be holding the port.

## Architecture

**Request flow:** `GET /emails/enriched` → `controllers/gmail.controller.ts` → `services/gmail.services.ts` (lists the 10 most recent messages, metadata only: Subject/From/Date and snippet) → for each email, `pipelines/email.pipeline.ts` runs `normalizeEmail` (HTML-entity decode) → `classifyEmail` (AI provider) → `enrichEmail`, giving `{ email, classification }` (`EnrichedEmail` in shared). All emails are classified in parallel with `Promise.all`.

**AI providers** (`server/src/services/ai/`): `AIProvider` interface with `classifyEmail()`. `index.ts` picks `GroqProvider` or `OllamaProvider` (`localhost:11434`, model `qwen2.5:14b`) from `AI_MODEL` when the module loads. Both share the prompt in `prompts/ai.prompt.ts`, which defines the confidence bands and the status values. On any failure, providers return a fallback `{ isJobRelated: false, confidence: 0, status: "unknown" }`. **All-zero confidence means the provider is failing**, so check the server logs (e.g. a Groq 404 for a model that no longer exists, or a 429 because the free tier allows 8,000 tokens per minute). To add a provider, implement `AIProvider` and wire it in `services/ai/index.ts`.

**Auth:** `services/oauth.service.ts` creates one `OAuth2Client` (`google-auth-library`) from env, using the refresh token. It is shared by the Gmail client (`@googleapis/gmail`, not the full `googleapis` package). `/auth/google` and `/auth/google/callback` are only used to mint a refresh token. `@googleapis/gmail` and `google-auth-library` must be on the same major version, or the `auth` option fails to type-check.

**Env-loading order:** `index.ts` calls `dotenv.config()` *after* its imports run (ESM hoisting). Env is actually loaded by the `dotenv.config()` in `oauth.service.ts`, which the routes import before `services/ai/index.ts` reads `AI_MODEL`. Changing the import order can silently switch the AI provider to Ollama.

**Client:** `pages/InboxPage.tsx` fetches `/emails/enriched` with axios and filters by `classification.status` (filter values in `constants/filters.constants.ts`). In dev, Vite proxies `/emails` and `/auth` to `localhost:4000`. In production, Express serves `packages/client/dist` statically and has a catch-all route that returns `index.html`. `@gmail-job-manager/shared` resolves to `../shared/src` through a Vite alias and tsconfig paths. Client import aliases: `#components`, `#constants`, `#pages`, `#lib`, `#hooks`.

**Shared types:** `packages/shared` contains only types (`exports` points to `dist/index.d.ts`), so import from it with `import type`.

**CI:** `.github/workflows/docker-build.yml` builds the root `Dockerfile` and pushes it to GHCR on pushes to `main` and on `v*` tags.

## Coding Principles
- Strict TypeScript, no `any`, no `@ts-ignore`.
- Server is ESM with `nodenext` resolution, so relative imports need a `.js` extension.
- Clean, focused functions, error handling everywhere. Log errors before returning fallbacks or 500s so failures are visible.
- Secrets live only in `.env` files.
- Consistent REST API response format: `{ success: true, data }` on success, `{ success: false, error: string }` on failure.
- Manually copy generated code from Claude sessions into project files.
