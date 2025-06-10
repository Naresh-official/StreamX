# StreamX Transcoder

Video transcoding service for StreamX platform using FFmpeg and BullMQ.

## Features

- Video transcoding to multiple resolutions (480p, 720p, 1080p)
- HLS (HTTP Live Streaming) output format
- Redis-based job queue with BullMQ
- AWS S3 integration for file storage
- Docker containerization

## Development

### Prerequisites

- Node.js 20+
- pnpm
- FFmpeg
- Redis
- AWS S3 credentials

### Setup

1. Install dependencies:
```bash
pnpm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Configure your environment variables in `.env`

4. Start the transcoder:
```bash
pnpm dev
```

## Docker Deployment

### Using Docker Compose (Recommended)

1. Copy environment variables:
```bash
cp .env.example .env
```

2. Configure your environment variables in `.env`

3. Start the services:
```bash
docker-compose up -d
```

4. View logs:
```bash
docker-compose logs -f transcoder
```

5. Stop the services:
```bash
docker-compose down
```

### Using Docker only

1. Build the image:
```bash
docker build -t streamx-transcoder .
```

2. Run the container:
```bash
docker run -d \
  --name streamx-transcoder \
  --env-file .env \
  -v $(pwd)/tmp:/app/tmp \
  streamx-transcoder
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REDIS_HOST` | Redis server hostname | `localhost` or `redis` |
| `REDIS_PORT` | Redis server port | `6379` |
| `REDIS_PASSWORD` | Redis password | `your_password` |
| `BACKEND_URL` | Backend API URL | `http://localhost:3001/api/v1` |
| `AWS_REGION` | AWS region | `us-east-1` |
| `AWS_ACCESS_KEY_ID` | AWS access key | `your_access_key` |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | `your_secret_key` |
| `S3_BUCKET` | S3 bucket name | `your-bucket` |
| `CLOUDFRONT_DISTRIBUTION` | CloudFront URL | `https://xxx.cloudfront.net` |

## Architecture

The transcoder works as follows:

1. Listens for video transcoding jobs from Redis queue
2. Downloads original video from S3
3. Transcodes video to multiple resolutions using FFmpeg
4. Uploads transcoded segments to S3
5. Updates video status in backend API
6. Cleans up temporary files

## Monitoring

- Check container logs: `docker logs streamx-transcoder`
- Monitor Redis queue: Connect to Redis and inspect the `video-transcode` queue
- Check S3 bucket for uploaded segments
- Monitor backend API for video status updates

## Troubleshooting

### Common Issues

1. **FFmpeg not found**: Ensure FFmpeg is installed in the container
2. **Redis connection failed**: Check Redis host, port, and password
3. **S3 upload failed**: Verify AWS credentials and bucket permissions
4. **Transcoding failed**: Check video format compatibility and FFmpeg logs

### Debug Mode

Run with debug logging:
```bash
DEBUG=* pnpm dev
```

Or in Docker:
```bash
docker run -e DEBUG=* streamx-transcoder
```