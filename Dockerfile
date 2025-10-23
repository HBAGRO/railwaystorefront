# Dockerfile for Medusa Next.js Storefront
# This Dockerfile bypasses the mise timeout issue by installing pnpm directly

FROM node:22-alpine AS base

# Install pnpm directly using npm (bypasses mise timeout issue)
RUN npm install -g pnpm@9.15.9

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app

# Accept build arguments for environment variables needed during build
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_INDEX_NAME
ARG NEXT_PUBLIC_SEARCH_ENDPOINT
ARG NEXT_PUBLIC_MINIO_ENDPOINT
ARG MEILISEARCH_API_KEY

# Set them as environment variables for the build process
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=$NEXT_PUBLIC_MEDUSA_BACKEND_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_INDEX_NAME=$NEXT_PUBLIC_INDEX_NAME
ENV NEXT_PUBLIC_SEARCH_ENDPOINT=$NEXT_PUBLIC_SEARCH_ENDPOINT
ENV NEXT_PUBLIC_MINIO_ENDPOINT=$NEXT_PUBLIC_MINIO_ENDPOINT
ENV MEILISEARCH_API_KEY=$MEILISEARCH_API_KEY

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js application
# Railway will automatically pass environment variables as build args
RUN pnpm run build:next

# Stage 3: Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set ownership
RUN chown -R nextjs:nodejs /app

USER nextjs

# Expose the port that Next.js runs on
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]
