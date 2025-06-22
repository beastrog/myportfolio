import dotenv from 'dotenv';
import { createServer, Server } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import app from './app.js';

// Get current file and directory paths
const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env');

// Load .env file if it exists
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf-8');
  const envVars = dotenv.parse(envFile);
  
  // Set environment variables if they're not already set
  for (const [key, value] of Object.entries(envVars)) {
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
  
  console.log(`✅ Loaded environment variables from ${envPath}`);
} else {
  console.warn(`⚠️  Warning: .env file not found at ${envPath}`);
}

// Log environment variables for debugging
console.log('\n=== Environment Variables ===');
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'Not set'}`);
console.log(`PORT: ${process.env.PORT || 'Not set'}`);
console.log(`CORS_ORIGINS: ${process.env.CORS_ORIGINS || 'Not set'}`);
console.log(`RESEND_API_KEY: ${process.env.RESEND_API_KEY ? '***' : 'Not set'}`);
console.log(`EMAIL_FROM: ${process.env.EMAIL_FROM || 'Not set'}`);
console.log(`EMAIL_TO: ${process.env.EMAIL_TO || 'Not set'}`);
console.log('=============================\n');

// Log environment variables for debugging
console.log('=== Environment Variables ===');
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'Not set'}`);
console.log(`PORT: ${process.env.PORT || 'Not set'}`);
console.log(`CORS_ORIGINS: ${process.env.CORS_ORIGINS || 'Not set'}`);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string): number | string | false {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

// Create HTTP server
const server = createServer(app);

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Ensure port is a number for server.listen()
const portNumber = typeof port === 'string' ? parseInt(port, 10) : (port || 3000);

// Debug logging for environment variables
console.log('=== Environment Variables ===');
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`PORT: ${port}`);
console.log(`CORS_ORIGINS: ${process.env.CORS_ORIGINS || 'Not set'}`);
console.log(`RESEND_API_KEY: ${process.env.RESEND_API_KEY ? '***' : 'Not set'}`);
console.log(`EMAIL_FROM: ${process.env.EMAIL_FROM || 'Not set'}`);
console.log(`EMAIL_TO: ${process.env.EMAIL_TO || 'Not set'}`);
console.log('=============================');

// Start the server
const startServer = (): void => {
  server.listen(portNumber, '0.0.0.0', () => {
    console.log(`\n=== Server Started ===`);
    console.log(`Server is running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`CORS Origins: ${process.env.CORS_ORIGINS || 'Not configured'}`);
    console.log(`API Routes:`);
    console.log(`- GET /api/health`);
    console.log(`- POST /api/contact`);
    console.log('====================\n');
  });

  // Handle graceful shutdown
  const shutdown = () => {
    console.log('\nShutting down server...');
    server.close(() => {
      console.log('Server has been stopped');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

// Start the server if this file is run directly
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

// Error handling for unhandled promise rejections
process.on('unhandledRejection', (reason: Error | any, promise: Promise<any>) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error('Reason:', reason?.message || reason);
  if (reason?.stack) {
    console.error(reason.stack);
  }
  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});

// Error handling for uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error('Error:', err.message);
  console.error(err.stack);
  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully...');
  server.close(() => {
    console.log('💥 Process terminated!');
    process.exit(0);
  });
});

// For Vercel deployment
export default async function handler(req: any, res: any) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Log the incoming request
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    
    // Pass the request to Express
    return app(req, res);
  } catch (error) {
    console.error('Error in server handler:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
  
  // Pass the request to the Express app
  return app(req, res);
}
