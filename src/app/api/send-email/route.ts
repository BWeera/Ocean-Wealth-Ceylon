import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, company, message, source, details } = await request.json();
    const recipientEmail = 'oceanwealthceylon@gmail.com';

    // Configure your SMTP transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use 'gmail', 'outlook', 'sendgrid', etc.
      auth: {
        // We will use environment variables for security.
        user: process.env.EMAIL_USER, // e.g., 'your-email@gmail.com'
        pass: process.env.EMAIL_PASS, // e.g., 'your-gmail-app-password'
      },
    });

    // Format the email content
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: recipientEmail,
      replyTo: email, // If you reply, it goes to the customer
      subject: `New Inquiry from ${name} via ${source}`,
      text: `
        Name: ${name}
        Email: ${email}
        Company: ${company || 'N/A'}
        Source: ${source}
        Details: ${details || 'None'}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">New Website Inquiry: ${source}</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          ${details ? `<p><strong>Order Details:</strong> ${details}</p>` : ''}
          <hr style="border: 1px solid #eee; my-4;" />
          <p><strong>Message / Requirements:</strong></p>
          <p style="background: #f8fafc; padding: 15px; border-radius: 8px;">${message.replace(/\n/g, '<br/>')}</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email. Check SMTP settings.' },
      { status: 500 }
    );
  }
}
