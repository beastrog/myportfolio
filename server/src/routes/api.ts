import { Router, Request, Response, NextFunction } from 'express';
import { submitContactForm } from '../controllers/contactController.js';

console.log('Initializing API router...');

const router = Router();

// Health check endpoint
router.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Contact form endpoints
router.route('/contact')
  .get((req: Request, res: Response) => {
    res.json({ 
      status: 'success',
      message: 'Contact endpoint is working. Send a POST request to submit the form.'
    });
  })
  .post(async (req: Request, res: Response) => {
    try {
      await submitContactForm(req, res);
    } catch (error) {
      console.error('Error in contact form submission:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

console.log('API router initialized');

export default router;
