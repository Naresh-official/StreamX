FROM node:20-alpine

RUN apk add --no-cache \
    ffmpeg \
    && rm -rf /var/cache/apk/*

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./

COPY apps/transcoder/package.json ./apps/transcoder/package.json
COPY packages/config/package.json ./packages/config/package.json
COPY packages/s3/package.json ./packages/s3/package.json

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm build --filter=transcoder

RUN mkdir -p apps/transcoder/dist/tmp/480 apps/transcoder/dist/tmp/720 apps/transcoder/dist/tmp/1080

EXPOSE 8002
ENV NODE_ENV=production

CMD ["node", "apps/transcoder/dist/index.js"]
