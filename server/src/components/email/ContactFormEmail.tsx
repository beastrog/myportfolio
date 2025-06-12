import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  subject,
  message,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>
    <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
      New Contact Form Submission
    </h1>
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ color: '#2c3e50', margin: '20px 0 10px' }}>From:</h2>
      <p style={{ margin: '5px 0' }}><strong>Name:</strong> {name}</p>
      <p style={{ margin: '5px 0' }}><strong>Email:</strong> {email}</p>
    </div>
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ color: '#2c3e50', margin: '20px 0 10px' }}>Subject:</h2>
      <p style={{ margin: '5px 0' }}>{subject || 'No subject provided'}</p>
    </div>
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ color: '#2c3e50', margin: '20px 0 10px' }}>Message:</h2>
      <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
    </div>
  </div>
); 