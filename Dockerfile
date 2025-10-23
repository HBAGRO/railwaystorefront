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

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js application
# The build script includes 'npm run wait' which waits for the backend
# In Railway, make sure MEDUSA_BACKEND_URL is set as an environment variable
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
