// src/services/emailService.js
const nodemailer = require('nodemailer');

const createTransporter = () => {
  // Create transporter with Gmail SMTP settings
  return nodemailer.createTransport({
    service: 'gmail',  // Using Gmail service instead of custom SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD // App password from Google
    }
  });
};

exports.sendContactNotification = async ({ email, name, message }) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'info@softwarehouseworld.com',
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return info;
    
  } catch (error) {
    console.error('Email sending failed:', error);
    // Don't throw the error - just log it and continue
    // This prevents the API from failing if email sending fails
    return null;
  }
};