require('dotenv').config();
const express = require('express');
const { Resend } = require('resend');
const app = express();
const port = process.env.PORT || 3002;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('Health check received');
  res.json({ status: 'ok', message: 'Minimal server is running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    console.log('Sending email from:', process.env.EMAIL_FROM);
    console.log('Sending email to:', process.env.EMAIL_TO);
    
    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <${process.env.EMAIL_FROM}>`,
      to: [process.env.EMAIL_TO],
      subject: `New Contact Form: ${subject || 'No Subject'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: error.message
      });
    }

    console.log('Email sent successfully:', data);
    res.json({ 
      success: true, 
      message: 'Message sent successfully!',
      data: req.body
    });
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log('Endpoints:');
  console.log(`  GET  http://localhost:${port}/api/health`);
  console.log(`  POST http://localhost:${port}/api/contact`);
});
