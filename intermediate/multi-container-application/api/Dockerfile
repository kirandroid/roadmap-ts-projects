FROM oven/bun:1.3.5 AS base
WORKDIR /app

FROM base AS install
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

FROM base AS builder
COPY --from=install /app/node_modules ./node_modules
COPY . .

RUN bun build ./index.ts --outdir ./dist --target bun

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=install /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["bun", "dist/index.js"]
