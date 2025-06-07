const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const UPLOAD_DIR = './uploads';

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
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
    let resumeAttachment = null;

    // If there's a file uploaded
    if (req.file) {
      const filePath = path.resolve(UPLOAD_DIR, req.file.filename);
      const fileContent = fs.readFileSync(filePath);
      const base64File = fileContent.toString('base64');
      
      resumeAttachment = [{
        filename: req.file.originalname,
        content: base64File,
        type: req.file.mimetype,
        disposition: 'attachment'
      }];
      
      // Clean up the uploaded file after reading
      fs.unlinkSync(filePath);
    }

    const emailData = {
      from: `Portfolio Contact <${process.env.VITE_EMAIL_FROM}>`,
      to: process.env.VITE_EMAIL_TO,
      subject: `New Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06b6d4;">New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          ${resumeAttachment ? '<p style="margin-top: 10px;"><strong>Resume attached</strong></p>' : ''}
          <p style="margin-top: 20px; color: #666; font-size: 0.9em;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
      attachments: resumeAttachment || []
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
        error: data.message || 'Failed to send email' 
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
      error: 'Internal server error' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('CORS enabled for http://localhost:8080');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
