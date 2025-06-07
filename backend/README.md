# Backend Service

This is the backend service for the portfolio website, handling contact form submissions and other API requests.

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
NODE_ENV=production
PORT=3001
EMAIL_SERVICE=your_email_service  # e.g., 'gmail'
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
EMAIL_TO=deyaniruddha_goat@yahoo.com
```

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Production

The application is configured to deploy to Render automatically when changes are pushed to the main branch.
