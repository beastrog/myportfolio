import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import config from './config/config.js';
import errorHandler from './middleware/errorHandler.js';
import apiRoutes from './routes/api.js';
import morgan from 'morgan';

const app = express();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "unsafe-none" }
}));

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// CORS configuration
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    // In development, allow all localhost origins and Vercel preview URLs
    if (process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview') {
      if (
        origin.startsWith('http://localhost:') || 
        origin.endsWith('.vercel.app') ||
        origin.endsWith('.vercel.app/')
      ) {
        return callback(null, true);
      }
    }

    // In production, check against allowed origins
    if (config.cors?.origins?.includes(origin)) {
      return callback(null, true);
    }

    console.warn(`Blocked request from origin: ${origin}`);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar']
};

// Apply CORS before routes
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api', apiRoutes);

// Error handling middleware - must be after all other middleware and routes
app.use(errorHandler);

// Handle 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.originalUrl} not found` 
  });
});

// Error handling
app.use(errorHandler);

export default app;
