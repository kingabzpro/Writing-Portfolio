FROM oven/bun:1

WORKDIR /workspace

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 git \
  && rm -rf /var/lib/apt/lists/*

COPY package.json ./
RUN bun install

COPY . .

EXPOSE 4321

CMD ["bun", "run", "dev"]
