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
  subject: string;
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
            New Contact Form Submission
          </Heading>
        </Section>
        
        <Section style={content}>
          <Text style={paragraph}><strong>From:</strong> {name} &lt;{email}&gt;</Text>
          <Text style={paragraph}><strong>Subject:</strong> {subject}</Text>
          
          <Hr style={divider} />
          
          <Text style={messageText}>{message}</Text>
          
          <Hr style={divider} />
          
          <Text style={footer}>
            This email was sent via your portfolio contact form.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Arial, sans-serif',
  padding: '24px',
};

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  maxWidth: '600px',
  margin: '0 auto',
  overflow: 'hidden',
};

const header = {
  backgroundColor: '#3b82f6',
  color: '#ffffff',
  padding: '24px',
  textAlign: 'center' as const,
};

const heading = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold' as const,
  margin: 0,
};

const content = {
  padding: '24px',
};

const paragraph = {
  color: '#333333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px 0',
};

const divider = {
  border: 'none',
  borderTop: '1px solid #e5e7eb',
  margin: '24px 0',
};

const messageText = {
  ...paragraph,
  whiteSpace: 'pre-line',
};

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  textAlign: 'center' as const,
  marginTop: '24px',
};
