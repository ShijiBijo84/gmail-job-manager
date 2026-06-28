# CLAUDE.md

## Execution Requirement

Before any task, you must:
1. Read this file
2. Extract rules
3. Confirm enforcement
4. Only then proceed

Failure to do so invalidates the response.

## Project: Gmail Job Manager

A system that:
- Imports Gmail messages
- Extracts job application data using AI (Ollama / DeepSeek-R1)
- Tracks applications (company, role, status, dates)
- Provides a React dashboard for managing job search workflow

---

# 1. Core Principle

This project is **code-first, evidence-driven**.

You must NEVER:
- assume architecture
- invent files
- introduce technologies not in the repo
- guess backend/frontend structure

You MUST:
- base all reasoning on actual repository files
- explicitly reference file paths
- state uncertainty when information is missing

---

# 2. Mandatory Repository Discipline

Before any task:

1. Read the repository
2. List relevant files
3. Identify entry points (frontend + backend)
4. Trace execution flow before proposing changes

If a file is not found in the repo:
→ explicitly say: "NOT PRESENT IN CODEBASE"

---

# 3. CLAUDE.md Enforcement Rule

Before executing any task, you MUST:

- summarize CLAUDE.md rules
- list which rules apply to the current task
- explain how you will enforce them

If CLAUDE.md is missing or unclear:
→ STOP and ask for clarification

---

# 4. No Assumptions Rule

You are NOT allowed to assume:

- backend framework
- database exists
- API endpoints exist
- authentication system exists
- Gmail integration exists
- folder structure beyond what is visible

If something is needed but missing:
→ label it as "MISSING FEATURE"

---

# 5. Allowed Stack

Strictly limited to:

Frontend:
- React
- TypeScript
- Vite

Backend:
- Node.js
- Express (only if present in repo)

AI:
- Ollama
- DeepSeek-R1

No other frameworks unless explicitly present.

---

# 6. Architecture Rules

- Frontend and backend must remain clearly separated
- Business logic must NOT live in React components
- API routes must be thin controllers
- AI processing must be isolated in services layer

---

# 7. Gmail Data Rules

- Gmail data is read-only unless explicitly stated
- Always preserve raw email data
- Store Gmail message IDs to prevent duplication
- AI extraction is probabilistic and must be treated as uncertain

---

# 8. AI / LLM Rules (Ollama DeepSeek-R1)

- AI output is NOT trusted data
- Always validate extracted fields
- AI must return structured JSON when possible
- Never let AI directly mutate state or database
- All AI calls must be wrapped in service layer

---

# 9. Code Change Discipline

When making changes:

1. Explain plan first
2. List files that will change
3. Wait for approval (if interactive session)
4. Modify ONLY listed files
5. Avoid unrelated refactoring

Max scope:
- 1–3 files per change unless explicitly approved

---

# 10. File Structure Rules (expected pattern)

src/
  components/
  pages/
  hooks/
  services/
  api/
  utils/
  types/
  store/

server/
  routes/
  controllers/
  services/
  middleware/
  utils/

If structure differs:
→ document actual structure first
→ do NOT enforce this structure blindly

---

# 11. TypeScript Rules

- No `any`
- No `@ts-ignore`
- No unsafe type casting unless justified
- Prefer interfaces for API models
- All AI outputs must have typed validation layer

---

# 12. React Rules

- Functional components only
- Hooks preferred
- No business logic inside components
- Keep components < 200 lines
- Split UI and logic (hooks/services pattern)

---

# 13. Backend Rules

- Routes must be thin
- Logic must live in services
- Use async/await only
- Validate all inputs
- Never trust frontend data

---

# 14. Change Safety Rules

Before implementing:

You MUST answer:
- What problem does this solve?
- What files are affected?
- What breaks if this change is wrong?

If unclear → STOP

---

# 15. Output Discipline

When analyzing code:

- Prefer exact file references
- Avoid speculation
- Separate facts vs assumptions

Format:

FACT:
- derived from code

UNKNOWN:
- not found in repository

---

# 16. Definition of Done

A task is only complete if:

- TypeScript compiles
- No lint errors
- No unused code added
- No new dependencies without approval
- Changes are minimal and scoped
- Behavior is verified against existing code

---

# 17. Roadmap Philosophy

Development must be:

- incremental
- verifiable
- reversible

Never build large features in one step.

Always decompose into small milestones.

---

# 18. Final Rule

If you are uncertain at any point:

→ STOP
→ state uncertainty
→ request clarification
→ do not guess