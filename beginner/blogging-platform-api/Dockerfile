# Stage 1: Base
FROM oven/bun:1.3.5 AS base
WORKDIR /app

# Stage 2: Dependencies & Build
COPY package.json bun.lockb* ./
COPY prisma ./prisma/

# Intall dependencies
RUN bun install --frozen-lockfile

# Generate Prisma Client
RUN bunx prisma generate

# Copy source and build
COPY . .

# Environment setup
ENV NODE_ENV=production
EXPOSE 3000

# Run migrations and start the server
CMD ["sh", "-c", "bunx prisma migrate deploy && bun index.ts"]