import * as React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
} from '@react-email/components';

interface ContactFormEmailProps {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const ContactFormEmail = ({
  name,
  email,
  subject = 'No Subject',
  message,
}: ContactFormEmailProps) => (
  <Html>
    <Head />
    <Preview>New contact form submission from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading as="h2" style={heading}>
            📬 New Contact Form Submission
          </Heading>
        </Section>
        <Section style={card}>
          <Text style={label}><strong>From:</strong></Text>
          <Text style={value}>{name} &lt;{email}&gt;</Text>
          <Text style={label}><strong>Subject:</strong></Text>
          <Text style={value}>{subject}</Text>
          <Hr style={divider} />
          <Text style={label}><strong>Message:</strong></Text>
          <Text style={messageText}>{message}</Text>
        </Section>
        <Hr style={divider} />
        <Section style={footerSection}>
          <Text style={footer}>
            <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>Aniruddha Dey Portfolio</span> <br />
            <span style={{ color: '#6b7280' }}>This email was sent via your portfolio contact form.</span>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Arial, sans-serif',
  padding: '0',
};

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 24px rgba(59, 130, 246, 0.10)',
  maxWidth: '600px',
  margin: '32px auto',
  overflow: 'hidden',
  border: '1px solid #e5e7eb',
};

const header = {
  background: 'linear-gradient(90deg, #3b82f6 0%, #a78bfa 100%)',
  color: '#fff',
  padding: '32px 0 16px 0',
  textAlign: 'center' as const,
};

const heading = {
  color: '#fff',
  fontSize: '28px',
  fontWeight: 'bold' as const,
  margin: 0,
  letterSpacing: '1px',
};

const card = {
  padding: '32px',
  background: 'linear-gradient(135deg, #f0f9ff 0%, #fdf2f8 100%)',
  borderRadius: '0 0 12px 12px',
};

const label = {
  color: '#3b82f6',
  fontSize: '16px',
  margin: '16px 0 4px 0',
  fontWeight: 'bold' as const,
};

const value = {
  color: '#111827',
  fontSize: '16px',
  margin: '0 0 8px 0',
};

const divider = {
  border: 'none',
  borderTop: '1px solid #e5e7eb',
  margin: '24px 0',
};

const messageText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  background: '#fff',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.05)',
  whiteSpace: 'pre-line' as const,
  margin: '8px 0 0 0',
};

const footerSection = {
  padding: '16px 0 24px 0',
  textAlign: 'center' as const,
};

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  marginTop: '8px',
};
