import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3001;
  const UPLOAD_DIR = './uploads';

  // Ensure upload directory exists
  try {
    await fs.promises.mkdir(UPLOAD_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating upload directory:', error);
    process.exit(1);
  }

  // Configure multer for file uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
  });

  // Middleware
  app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Handle preflight requests
  app.options('*', cors());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
  });

  // Proxy endpoint for contact form
  app.post('/api/send-email', upload.single('resume'), async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      let resumeAttachment = [];

      // If there's a file uploaded
      if (req.file) {
        const filePath = path.resolve(UPLOAD_DIR, req.file.filename);
        const fileContent = await fs.promises.readFile(filePath);
        const base64File = fileContent.toString('base64');
        
        resumeAttachment = [{
          filename: req.file.originalname,
          content: base64File,
          type: req.file.mimetype,
          disposition: 'attachment'
        }];
        
        // Clean up the uploaded file after reading
        try {
          await fs.promises.unlink(filePath);
        } catch (error) {
          console.error('Error deleting file:', error);
          // Continue even if file deletion fails
        }
      }

      const emailData = {
        from: `Portfolio Contact <${process.env.VITE_EMAIL_FROM}>`,
        to: [process.env.VITE_EMAIL_TO],
        subject: `New Contact: ${subject || 'No Subject'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #06b6d4;">New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
            <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            ${resumeAttachment.length ? '<p style="margin-top: 10px;"><strong>Resume attached</strong></p>' : ''}
            <p style="margin-top: 20px; color: #666; font-size: 0.9em;">
              This message was sent from your portfolio contact form.
            </p>
          </div>
        `,
        attachments: resumeAttachment
      };

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.VITE_RESEND_API_KEY}`
        },
        body: JSON.stringify(emailData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Resend API error:', data);
        return res.status(response.status).json({ 
          success: false, 
          error: data.message || 'Failed to send email',
          details: data
        });
      }

      res.status(200).json({ 
        success: true, 
        id: data.id 
      });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Internal server error',
        message: error.message
      });
    }
  });

  // Start server
  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('CORS enabled for http://localhost:8080');
  });

  // Handle server shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

  return server;
}

// Start the server
startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
