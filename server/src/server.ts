import app from './app.js';
import config from './config/config.js';

// Add debug logging for environment variables
console.log('Environment Variables:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- PORT:', process.env.PORT);
console.log('- CORS_ORIGINS:', process.env.CORS_ORIGINS);
console.log('- RESEND_API_KEY:', process.env.RESEND_API_KEY ? '***' : 'Not set');
console.log('- EMAIL_FROM:', process.env.EMAIL_FROM);
console.log('- EMAIL_TO:', process.env.EMAIL_TO);

// Debug middleware to log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = config.port;
  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`\n=== Server Started ===`);
    console.log(`Server is running on port ${port}`);
    console.log(`Environment: ${config.env}`);
    console.log(`CORS Origins:`, config.cors.origin);
    console.log(`API Routes:`);
    console.log(`- GET /api/health`);
    console.log(`- POST /api/contact`);
    console.log('====================\n');
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err: Error) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    console.error('Error Stack:', err.stack);
    server.close(() => {
      process.exit(1);
    });
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err: Error) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });

  // Handle SIGTERM for graceful shutdown
  process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      console.log('💥 Process terminated!');
    });
  });
}

// Export the Express app for Vercel
export default app;
