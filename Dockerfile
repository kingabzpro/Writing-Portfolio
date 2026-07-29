FROM oven/bun:1 AS builder

WORKDIR /build

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 git \
  && rm -rf /var/lib/apt/lists/*

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM oven/bun:1 AS runner

WORKDIR /app

COPY --from=builder /build/dist ./dist

EXPOSE 4321

CMD ["bun", "x", "serve", "--port", "4321", "dist"]
