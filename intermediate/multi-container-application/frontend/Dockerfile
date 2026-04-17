FROM oven/bun:1.3.5 AS base
WORKDIR /app

FROM base AS install
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

FROM base AS builder
COPY --from=install /app/node_modules ./node_modules
COPY . .

RUN bun run build

FROM base AS runner
WORKDIR /app

COPY --from=install /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bunfig.toml ./bunfig.toml
COPY --from=builder /app/src ./src
COPY --from=builder /app/styles ./styles

ENV NODE_ENV=production
EXPOSE 3000

CMD ["bun", "src/index.ts"]
