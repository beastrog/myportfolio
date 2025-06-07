require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const port = process.env.PORT || 3001;

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const requestTime = new Date().toISOString();
  
  console.log(`[${requestTime}] ${req.method} ${req.url}`);
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${requestTime}] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
  });
  
  next();
});

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8080',
  process.env.FRONTEND_URL
].filter(Boolean);

// CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('Health check received');
  res.json({ status: 'ok', message: 'Server is running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Contact form submission received:', req.body);
    
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      console.log('Validation failed - missing fields');
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required'
      });
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact: ${subject || 'No Subject'}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to send email',
        details: error.message
      });
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
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Log all available routes
const printRoutes = () => {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Routes registered directly on the app
      routes.push(`${Object.keys(middleware.route.methods).join(', ').toUpperCase()}\t${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      // Routes added as router
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push(`${Object.keys(handler.route.methods).join(', ').toUpperCase()}\t${handler.route.path}`);
        }
      });
    }
  });
  console.log('\nAvailable Routes:');
  console.log('----------------');
  console.log(routes.join('\n'));
};

// Start server
const server = app.listen(port, '0.0.0.0', () => {
  console.log('\n=== Server Information ===');
  console.log(`Server is running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Allowed origins: ${JSON.stringify(allowedOrigins)}`);
  console.log(`Resend API Key configured: ${process.env.RESEND_API_KEY ? 'Yes' : 'No'}`);
  console.log(`Email From: ${process.env.EMAIL_FROM}`);
  console.log(`Email To: ${process.env.EMAIL_TO}`);
  console.log('==========================\n');
  
  // Print available routes
  printRoutes();
  
  // Test database connection if needed
  console.log('\n=== Testing Database Connection ===');
  // Add database connection test here if needed
  console.log('No database connection required for this example');
  console.log('===================================\n');
});
