import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/email/ContactFormEmail';

// Initialize Resend with environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

// Type for the request body
type ContactFormData = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

// Validate required environment variables
if (!process.env.RESEND_API_KEY) {
  console.error('Missing required environment variable: RESEND_API_KEY');
}

if (!process.env.EMAIL_TO) {
  console.error('Missing required environment variable: EMAIL_TO');
}

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed',
      allowedMethods: ['POST']
    });
  }

  try {
    // Parse and validate request body
    const { name, email, subject = '', message } = req.body as ContactFormData;
    
    // Validate required fields
    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!message) missingFields.push('message');
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields,
        required: ['name', 'email', 'message']
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address',
        field: 'email'
      });
    }

    // Prepare email data
    const emailSubject = subject ? `New Contact: ${subject}` : 'New Contact Form Submission';
    const fromEmail = process.env.EMAIL_FROM || 'Portfolio Contact <onboarding@resend.dev>';
    const toEmail = process.env.EMAIL_TO || '';

    if (!toEmail) {
      throw new Error('Recipient email not configured');
    }

    console.log('Sending email with data:', { 
      to: toEmail,
      from: fromEmail,
      subject: emailSubject
    });

    // Send email using Resend
    const { data: emailData, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
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
      console.error('Resend API error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send email',
        error: error.message,
        details: error
      });
    }

    console.log('Email sent successfully:', emailData);
    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!',
      data: emailData
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
      ...(process.env.NODE_ENV === 'development' && error instanceof Error 
        ? { stack: error.stack } 
        : {})
    });
  }
}
