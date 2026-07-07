# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./
COPY packages/shared/package*.json ./packages/shared/
COPY packages/server/package*.json ./packages/server/
COPY packages/client/package*.json ./packages/client/

# Install all dependencies
RUN npm ci

# Copy source code and tsconfigs
COPY tsconfig.base.json ./
COPY packages/shared/tsconfig.json ./packages/shared/
COPY packages/server/tsconfig.json ./packages/server/
COPY packages/client/tsconfig.json ./packages/client/
COPY packages/shared ./packages/shared
COPY packages/server ./packages/server
COPY packages/client ./packages/client

# Build shared first (no dependencies)
RUN npm run build --workspace=packages/shared

# Build server (depends on shared)
RUN npm run build --workspace=packages/server

# Build client (depends on shared)
RUN npm run build --workspace=packages/client

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 appuser && adduser -D -u 1001 -G appuser appuser

# Copy dependency manifests for production install
COPY package*.json ./
COPY packages/shared/package*.json ./packages/shared/
COPY packages/server/package*.json ./packages/server/

# Install production dependencies only
RUN npm ci --omit=dev && npm cache clean --force

# Copy built artifacts from builder
COPY --from=builder --chown=appuser:appuser /app/packages/server/dist ./packages/server/dist
COPY --from=builder --chown=appuser:appuser /app/packages/client/dist ./packages/client/dist
COPY --from=builder --chown=appuser:appuser /app/packages/shared ./packages/shared
COPY --from=builder --chown=appuser:appuser /app/node_modules ./node_modules

# Switch to non-root user
USER appuser

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["node", "packages/server/dist/index.js"]
