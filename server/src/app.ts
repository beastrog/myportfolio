import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import config from './config/config.js';
import errorHandler from './middleware/errorHandler.js';
import apiRoutes from './routes/api.js';
import morgan from 'morgan';

const app = express();
console.log('CORS_ORIGINS at runtime:', process.env.CORS_ORIGINS);
// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  crossOriginOpenerPolicy: { policy: 'unsafe-none' }
}));

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// CORS configuration
const corsOptions: cors.CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    // Get allowed origins from environment variable ONLY
    if (!process.env.CORS_ORIGINS) {
      console.warn('[CORS] No CORS_ORIGINS set in environment. Blocking all cross-origin requests.');
      return callback(new Error('Not allowed by CORS'));
    }
    const allowedOrigins = process.env.CORS_ORIGINS.split(',').map(o => o.trim().replace(/\/$/, ''));
    const normalizedOrigin = origin.trim().replace(/\/$/, '');
    console.log('[CORS DEBUG] Incoming origin:', origin, '| Normalized:', normalizedOrigin, '| Allowed:', allowedOrigins);
    
    // Allow all in development for easier testing
    if (process.env.NODE_ENV === 'development') {
      console.log(`[CORS] Allowing origin in development: ${origin}`);
      return callback(null, true);
    }
    
    // Check if origin is in the allowed list
    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }
    
    // Special cases for Vercel and Render
    if (origin.endsWith('.vercel.app') || origin.endsWith('.onrender.com')) {
      return callback(null, true);
    }
    
    console.warn(`[CORS] Blocked request from origin: ${origin}`);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Length', 'X-Request-Id'],
  maxAge: 600, // 10 minutes
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS before routes
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api', apiRoutes);

// Handle 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.originalUrl} not found` 
  });
});

// Error handling middleware - must be after all other middleware and routes
app.use(errorHandler);

export default app;
