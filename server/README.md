# Portfolio Backend Server

This is the backend server for the portfolio website, built with Node.js, Express, and TypeScript.

## Features

- Contact form submission with email notifications via Resend
- Rate limiting to prevent abuse
- Security best practices with Helmet, CORS, and other middleware
- Environment-based configuration
- Error handling and logging

## Prerequisites

- Node.js 18+
- npm or yarn
- Resend API key (for email functionality)

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd myportfolio/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your configuration

4. **Development**
   ```bash
   # Start development server
   npm run dev
   ```
   The server will be available at `http://localhost:3001`

5. **Production**
   ```bash
   # Build the application
   npm run build
   
   # Start the production server
   npm start
   ```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/contact` - Submit contact form
  ```json
  {
    "name": "John Doe",
    "email": "deyaniruddha_goat@yahoo.com",
    "subject": "Hello",
    "message": "This is a test message"
  }
  ```

## Environment Variables

- `PORT` - Port to run the server on (default: 3001)
- `NODE_ENV` - Environment (development, production)
- `RESEND_API_KEY` - Resend API key for sending emails
- `EMAIL_TO` - Email address to send contact form submissions to
- `EMAIL_FROM` - Sender email address
- `RATE_LIMIT_WINDOW_MS` - Rate limiting window in milliseconds
- `RATE_LIMIT_MAX` - Maximum number of requests per window per IP

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## Linting and Formatting

```bash
# Run linter
npm run lint

# Format code
npm run format
```

## Deployment

1. Set up your production environment variables
2. Build the application: `npm run build`
3. Start the server: `npm start`

For production, consider using a process manager like PM2:

```bash
# Install PM2 globally
npm install -g pm2

# Start the application with PM2
pm2 start dist/server.js --name "portfolio-server"
```

## License

MIT
