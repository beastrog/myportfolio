# Deployment Guide

This guide will help you deploy your portfolio application to a production environment.

## Prerequisites

- Node.js 18+ and npm 8+
- Git
- (Optional) Docker and Docker Compose
- (Optional) A hosting provider account (Vercel, Netlify, AWS, etc.)

## Environment Setup

1. Create a `.env.production` file in the root directory with your production environment variables:
   ```env
   NODE_ENV=production
   PORT=3001
   VITE_API_BASE_URL=https://your-production-domain.com
   EMAIL_FROM=your-email@yourdomain.com
   EMAIL_TO=your-email@yourdomain.com
   RESEND_API_KEY=your-resend-api-key
   ```

## Building for Production

### Option 1: Using the build script (Recommended)

1. Run the build script:
   ```bash
   node build.js
   ```

2. The production build will be available in the `dist` directory.

3. Deploy the contents of the `dist` directory to your hosting provider.

### Option 2: Manual Build

1. Install production dependencies:
   ```bash
   npm ci --only=production
   ```

2. Build the frontend:
   ```bash
   npm run build
   ```

3. Build the server:
   ```bash
   npm run build:server
   ```

4. The production build will be available in the `dist` directory.

## Deployment Options

### Option 1: Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t my-portfolio .
   ```

2. Run the container:
   ```bash
   docker run -p 3001:3001 --env-file .env.production my-portfolio
   ```

### Option 2: PM2 (Production Process Manager)

1. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```

2. Start the application with PM2:
   ```bash
   NODE_ENV=production pm2 start dist/server/index.js --name "my-portfolio"
   ```

3. Set up PM2 to start on system boot:
   ```bash
   pm2 startup
   pm2 save
   ```

### Option 3: Vercel/Netlify (Frontend Only)

1. Configure your frontend build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variables: Add your production environment variables

2. Connect your repository and deploy.

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| NODE_ENV | Environment (development/production) | Yes | development |
| PORT | Port to run the server on | No | 3001 |
| VITE_API_BASE_URL | Base URL for API requests | Yes | http://localhost:3001 |
| EMAIL_FROM | Sender email address | Yes | - |
| EMAIL_TO | Recipient email address | Yes | - |
| RESEND_API_KEY | Resend API key | Yes | - |

## Monitoring and Maintenance

- Set up error tracking (e.g., Sentry, LogRocket)
- Monitor application performance
- Set up log rotation
- Keep dependencies updated

## Troubleshooting

- Check server logs for errors
- Verify environment variables are set correctly
- Ensure all required ports are open and accessible
- Check database connections if applicable

## Security Considerations

- Use HTTPS in production
- Keep dependencies updated
- Use environment variables for sensitive data
- Implement rate limiting
- Set appropriate CORS policies
- Use security headers
