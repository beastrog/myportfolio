import { Request, Response } from 'express';
import { Resend } from 'resend';
import config from '../config/config.js';
import { ContactFormEmail } from '../components/email/ContactFormEmail.js';

interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// Initialize Resend client
let resend: Resend | null = null;

if (config.email.resendApiKey) {
  resend = new Resend(config.email.resendApiKey);
}

export const submitContactForm = async (req: Request, res: Response) => {
  // Validate required fields
  const { name, email, subject = '', message } = req.body as ContactFormData;
  
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields',
      required: ['name', 'email', 'message']
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email address',
      field: 'email'
    });
  }

  // Check if Resend is configured
  if (!resend) {
    console.error('Resend client not initialized - check your RESEND_API_KEY');
    return res.status(500).json({
      success: false,
      message: 'Email service is not configured properly',
      error: 'Email service initialization failed'
    });
  }

  try {
    const emailSubject = subject ? `New Contact: ${subject}` : 'New Contact Form Submission';
    
    const { data, error } = await resend.emails.send({
      from: config.email.from,
      to: config.email.to,
      reply_to: email,
      subject: emailSubject,
      react: ContactFormEmail({ 
        name, 
        email, 
        subject: emailSubject, 
        message 
      }),
    });

    if (error) {
      console.error('Error from Resend API:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return res.json({
      success: true,
      message: 'Message sent successfully!',
      data
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
