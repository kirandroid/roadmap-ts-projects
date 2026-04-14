FROM oven/bun:1.3.5 AS base

WORKDIR /app

COPY package.json bun.lockb* ./
COPY prisma ./prisma/

RUN bun install --frozen-lockfile

# Generate drizzle client
RUN bunx drizzle-kit generate

COPY . .
RUN bun build ./index.ts --outdir ./dist --target bun

FROM base AS runner
WORKDIR /app

COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./

COPY drizzle.config.ts .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["sh", "-c", "bunx drizzle-kit migrate && bun index.ts"]