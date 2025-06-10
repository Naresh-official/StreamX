# Use Node.js 20 Alpine as base image
FROM node:20-alpine

# Install FFmpeg and other dependencies
RUN apk add --no-cache \
    ffmpeg \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./
COPY pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Create tmp directories for video processing
RUN mkdir -p tmp/480 tmp/720 tmp/1080

# Build the application
RUN pnpm build

# Expose port (if needed for health checks)
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Start the transcoder worker
CMD ["pnpm", "start"]