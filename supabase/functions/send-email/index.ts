
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  resume?: File;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const resume = formData.get('resume') as File;

    console.log('Received contact form submission:', { name, email, subject });

    // Prepare email content
    let emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #06b6d4, #8b5cf6); padding: 20px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
        </div>
        <div style="background: #f8fafc; padding: 20px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1e293b; margin-top: 0;">Contact Details</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          
          <h3 style="color: #1e293b;">Message</h3>
          <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #06b6d4;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          
          ${resume ? `<p style="margin-top: 20px;"><strong>Resume attached:</strong> ${resume.name}</p>` : ''}
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 14px;">
            This email was sent from your portfolio contact form at aniruddhadey.dev
          </p>
        </div>
      </div>
    `;

    // Prepare attachments if resume is provided
    let attachments = [];
    if (resume && resume.size > 0) {
      const resumeBuffer = await resume.arrayBuffer();
      const resumeBase64 = btoa(String.fromCharCode(...new Uint8Array(resumeBuffer)));
      
      attachments.push({
        filename: resume.name,
        content: resumeBase64,
        type: resume.type,
        disposition: 'attachment'
      });
    }

    // Send email using Resend
    const emailPayload = {
      from: 'Portfolio Contact <noreply@aniruddhadey.dev>',
      to: ['deyaniruddha_goat@yahoo.com'],
      reply_to: email,
      subject: `Portfolio Contact: ${subject}`,
      html: emailHtml,
      ...(attachments.length > 0 && { attachments })
    };

    console.log('Sending email with payload:', { ...emailPayload, attachments: attachments.length });

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    const responseData = await response.text();
    console.log('Resend API response:', response.status, responseData);

    if (response.ok) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Email sent successfully',
          data: JSON.parse(responseData)
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      );
    } else {
      console.error('Failed to send email:', response.status, responseData);
      throw new Error(`Failed to send email: ${response.status} ${responseData}`);
    }
  } catch (error) {
    console.error('Error in send-email function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Unknown error occurred' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});
