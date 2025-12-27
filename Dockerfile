FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

EXPOSE 3030

CMD ["bun", "run", "index.ts"]