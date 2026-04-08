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
RUN bun build ./index.ts --outdir ./dist --target bun

# Stage 3: Runner
FROM base AS runner
WORKDIR /app

# Only copy necessary files from build stage
COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/package.json ./
COPY prisma.config.ts .

# Environment setup
ENV NODE_ENV=production
EXPOSE 3000

# Run migrations and start the server
CMD ["sh", "-c", "bunx prisma migrate deploy && bun index.ts"]