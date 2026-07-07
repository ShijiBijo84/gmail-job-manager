# Docker Setup Guide

## Build Notes

**Client Build**: The client (`packages/client`) is built locally before Docker build to avoid Tailwind CSS native binary compatibility issues in Alpine. The dist folder is in `.gitignore`.

**Git Flow**:
- Push source code only (dist auto-ignored)
- GitHub Actions automatically builds client before Docker build
- No need to commit dist folder

**Local Development**:
```bash
npm run build --workspace=packages/client  # Build once locally
docker build -t server:latest .
```

**Image Size**: ~88MB (node:20-alpine + shared + server + client)

## Local Development with Environment Variables

### 1. Create a root `.env` file
Copy `.env.example` to `.env` at the project root:
```bash
cp .env.example .env
```

Then fill in your actual values from your existing `packages/server/.env` and `packages/client/.env`:
```
GOOGLE_CLIENT_ID=your_actual_client_id
GOOGLE_CLIENT_SECRET=your_actual_secret
GOOGLE_REFRESH_TOKEN=your_actual_token
GROQ_API_KEY=your_actual_key
VITE_BASE_URL=http://localhost:4000
```

### 2. Run with Docker Compose
```bash
docker compose up
```

Docker Compose will automatically load all variables from `.env` and inject them into the server container.

## Push to Docker Registry

### Option 1: Docker Hub
```bash
# Log in
docker login

# Build and tag
docker build -t yourusername/gmail-job-manager:latest .
docker build -t yourusername/gmail-job-manager:$(git rev-parse --short HEAD) .

# Push
docker push yourusername/gmail-job-manager:latest
docker push yourusername/gmail-job-manager:$(git rev-parse --short HEAD)
```

### Option 2: GitHub Container Registry (GHCR)
```bash
# Create a Personal Access Token (PAT) at https://github.com/settings/tokens
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
- Builds on push to `main` and `develop` branches
- Builds on pull requests (without pushing)
- Pushes to GitHub Container Registry using GitHub Token
- Creates tags for releases (v1.0.0, etc.)
- Caches layers to speed up builds

### Setup Steps:

1. **Push to GitHub** (if not already):
```bash
git remote add origin https://github.com/your-username/gmail-job-manager.git
git push -u origin main
```

2. **Enable GitHub Actions** in your repo settings (usually enabled by default)

3. **Workflow will trigger automatically** on:
   - Push to `main` or `develop`
   - Tag creation (v1.0.0)
   - Pull requests

4. **View build status**: Go to **Actions** tab in your GitHub repo

### Images will be available at:
- `ghcr.io/your-username/gmail-job-manager:main` (latest commit)
- `ghcr.io/your-username/gmail-job-manager:v1.0.0` (release tag)
- `ghcr.io/your-username/gmail-job-manager:sha-abc1234` (commit SHA)

## Environment Variables in Production

### Via Docker Run:
```bash
docker run -e GOOGLE_CLIENT_ID=xxx -e GOOGLE_CLIENT_SECRET=yyy \
  ghcr.io/your-username/gmail-job-manager:latest
```

### Via .env file:
```bash
docker run --env-file .env.prod ghcr.io/your-username/gmail-job-manager:latest
```

### Via Docker Compose (Kubernetes, Docker Swarm):
Update `docker-compose.yml` with your production registry image:
```yaml
services:
  server:
    image: ghcr.io/your-username/gmail-job-manager:latest
    env_file:
      - .env.prod
```

Then deploy:
```bash
docker compose -f docker-compose.prod.yml up -d
```
