# Docker Setup Guide

## Overview

Your project is fully containerized with a multi-stage Docker build that compiles all workspaces (shared, server, client) inside Docker. The image is ~104MB and runs the server on port 4000.

**Key Features**:
- Multi-stage build (builder → runtime)
- Alpine-based (45MB node:20-alpine)
- Non-root user (appuser:1001)
- Health checks
- Environment variable support via `.env` files

## Local Development

### 1. Set up environment variables

Copy the example and fill in your credentials:
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
```
PORT=4000
NODE_ENV=production
AI_MODEL=ollama

GOOGLE_CLIENT_ID=your_actual_id
GOOGLE_CLIENT_SECRET=your_actual_secret
GOOGLE_REDIRECT_URI=http://localhost:4000/auth/google/callback
GOOGLE_REFRESH_TOKEN=your_actual_token

GROQ_API_KEY=your_actual_key
VITE_BASE_URL=http://localhost:4000
```

### 2. Build and run

```bash
# Build the Docker image
docker build -t server:latest .

# Run with docker-compose
docker compose up

# Or run directly
docker run -e GOOGLE_CLIENT_ID=xxx -e GOOGLE_CLIENT_SECRET=yyy \
  -p 4000:4000 server:latest
```

### 3. Access the app

- Server: `http://localhost:4000`
- Logs: `docker compose logs -f`
- Stop: `docker compose down`

## Push to Docker Registry

### Option 1: Docker Hub

```bash
# Log in
docker login

# Build and tag
docker build -t yourusername/gmail-job-manager:latest .

# Push
docker push yourusername/gmail-job-manager:latest
```

### Option 2: GitHub Container Registry (GHCR)

```bash
# Create a Personal Access Token at https://github.com/settings/tokens
# with `write:packages` permission

# Log in
echo $GITHUB_TOKEN | docker login ghcr.io -u your-username --password-stdin

# Build and tag
docker build -t ghcr.io/your-username/gmail-job-manager:latest .

# Push
docker push ghcr.io/your-username/gmail-job-manager:latest
```

## Automated CI/CD with GitHub Actions

The workflow file `.github/workflows/docker-build.yml` automatically:

- Builds on `git push` to `main` or `develop`
- Builds on pull requests (without pushing)
- Pushes to GitHub Container Registry on merge
- Creates tags for releases (v1.0.0, etc.)
- Caches layers for fast rebuilds

### How it works:

1. **Push code to GitHub**:
   ```bash
   git add .
   git commit -m "Update app"
   git push origin main
   ```

2. **GitHub Actions triggers automatically**:
   - Pulls your code
   - Runs `docker build`
   - Pushes to GHCR

3. **View build status**: Go to **Actions** tab in your GitHub repo

### Images available at:

- `ghcr.io/your-username/gmail-job-manager:main` (latest commit on main)
- `ghcr.io/your-username/gmail-job-manager:v1.0.0` (release tag)
- `ghcr.io/your-username/gmail-job-manager:sha-abc1234` (commit SHA)

## Production Deployment

### Using pre-built image

Update `docker-compose.prod.yml`:

```bash
# Copy example
cp docker-compose.prod.yml docker-compose.prod.yml

# Edit with your registry and credentials
```

Then deploy:

```bash
docker compose -f docker-compose.prod.yml up -d
```

### Environment variables in production

**Via .env file**:
```bash
docker run --env-file .env.prod -p 4000:4000 ghcr.io/your-username/gmail-job-manager:latest
```

**Via individual variables**:
```bash
docker run \
  -e GOOGLE_CLIENT_ID=xxx \
  -e GOOGLE_CLIENT_SECRET=yyy \
  -e GROQ_API_KEY=zzz \
  -p 4000:4000 ghcr.io/your-username/gmail-job-manager:latest
```

## Dockerfile Highlights

- **Builder stage**: Installs all deps, builds shared/server/client
- **Runtime stage**: Alpine base, production deps only, non-root user
- **Tailwind CSS**: Uses `@tailwindcss/postcss` (no native binaries)
- **Healthcheck**: Probes `/` on port 4000 every 30s
- **Layer caching**: Optimized for faster rebuilds

## Troubleshooting

**Container won't start**:
```bash
docker compose logs
# Check for missing env vars (GOOGLE_CLIENT_ID, etc.)
```

**Build fails**:
```bash
# Verify lock file is up to date
npm install

# Rebuild with no cache
docker build -t server:latest . --no-cache
```

**Image size too large**:
```bash
docker images server:latest
# Typical: ~104MB (shared + server + client + deps)
```
