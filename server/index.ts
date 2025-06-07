import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

// Create require for ES modules
const require = createRequire(import.meta.url);

// Import ContactFormEmail using require since it might be using CommonJS
const ContactFormEmail = require('../src/components/email/ContactFormEmail').ContactFormEmail;

// Initialize Resend with environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

// Load environment variables from .env file
try {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  // Determine environment and load appropriate .env file
  const envPath = process.env.NODE_ENV === 'production' 
    ? path.resolve(__dirname, '../.env.production')
    : path.resolve(__dirname, '../.env');

  console.log(`Loading environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('Environment file:', envPath);

  dotenv.config({ path: envPath });
} catch (error) {
  console.error('Error loading environment variables:', error);
  process.exit(1);
}

// Initialize Express app with production settings
const app = express();
const port = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(cors({
  origin: isProduction 
    ? ['https://yourdomain.com', 'https://www.yourdomain.com']
    : 'http://localhost:8080',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security headers middleware
app.use((req, res, next) => {
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // CSP header (adjust as needed for your app)
  if (isProduction) {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;"
    );
  }
  
  next();
});

// Trust first proxy (if behind a proxy like nginx)
app.set('trust proxy', 1);

// Rate limiting in production
if (isProduction) {
  const rateLimit = require('express-rate-limit');
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
  });
  app.use(limiter);
}

// Log environment info (without sensitive data)
console.log('Server configuration:', {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: port,
  EMAIL_TO: process.env.EMAIL_TO ? '***@***' : 'Not set',
  RESEND_API_KEY: process.env.RESEND_API_KEY ? '***' : 'Not set',
  isProduction
});

// Validate required environment variables
const requiredEnvVars = ['RESEND_API_KEY', 'EMAIL_TO'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('Error: Missing required environment variables:', missingVars.join(', '));
  console.error('Please check your .env file');
  process.exit(1);
}

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

console.log('Server starting with the following configuration:');
console.log(`- Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`- Port: ${port}`);
console.log(`- Email To: ${process.env.EMAIL_TO}`);

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With'],
  credentials: true
}));

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use(bodyParser.json());

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Contact form endpoint
const handleContactSubmit = async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, subject = '', message } = req.body as {
      name: string;
      email: string;
      subject?: string;
      message: string;
    };

    // Validate required fields
    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields',
        required: ['name', 'email', 'message']
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Invalid email address',
        field: 'email'
      });
      return;
    }

    // Prepare email data
    const emailSubject = subject ? `New Contact: ${subject}` : 'New Contact Form Submission';
    const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';
    const toEmail = process.env.EMAIL_TO;
    
    console.log('Using email configuration:', { fromEmail, toEmail });

    if (!toEmail) {
      throw new Error('Recipient email not configured');
    }

    console.log('Sending email with data:', { 
      to: toEmail,
      from: fromEmail,
      subject: emailSubject
    });

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: emailSubject,
      react: ContactFormEmail({ 
        name, 
        email, 
        subject: emailSubject, 
        message 
      }),
    });

    if (error) {
      console.error('Resend API error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send email',
        error: error.message
      });
      return;
    }

    console.log('Email sent successfully:', data);
    res.json({ 
      success: true, 
      message: 'Message sent successfully!',
      data
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Register the route handler
app.post('/api/contact', (req, res, next) => {
  handleContactSubmit(req, res).catch(next);
});

// Routes
app.get('/', (req, res) => {
  res.send('Portfolio API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle server shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
