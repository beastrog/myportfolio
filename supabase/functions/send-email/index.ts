
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string
    const resume = formData.get('resume') as File

    // Email content
    let emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `

    let attachments = []
    
    if (resume) {
      const resumeBuffer = await resume.arrayBuffer()
      const resumeBase64 = btoa(String.fromCharCode(...new Uint8Array(resumeBuffer)))
      
      attachments.push({
        filename: resume.name,
        content: resumeBase64,
        type: resume.type,
        disposition: 'attachment'
      })
      
      emailContent += `<p><strong>Resume:</strong> ${resume.name} (attached)</p>`
    }

    // Send email using Resend
    const emailData = {
      from: 'Portfolio Contact <noreply@aniruddhadey.dev>',
      to: ['deyaniruddha_goat@yahoo.com'],
      subject: `Portfolio Contact: ${subject}`,
      html: emailContent,
      reply_to: email,
      attachments: attachments.length > 0 ? attachments : undefined
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })

    if (response.ok) {
      return new Response(
        JSON.stringify({ message: 'Email sent successfully' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    } else {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
