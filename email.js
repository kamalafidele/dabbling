
const nodemailer = require('nodemailer');

// SMTP Configuration - Replace these values with your own
const smtpConfig = {
  host: 'smtp.example.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your-email@example.com',
    pass: 'your-password'
  }
};

// Create transporter object using SMTP configuration
const transporter = nodemailer.createTransport(smtpConfig);

// Email content
const mailOptions = {
  from: 'Your Name <your-email@example.com>',
  to: 'recipient@example.com',
  subject: 'SMTP Test Email',
  text: 'This is a test email to verify SMTP configuration.',
  html: '<p>This is a test email to verify SMTP configuration.</p>'
};

// Verify connection configuration
transporter.verify()
  .then(() => {
    console.log('SMTP connection verified successfully!');
    
    // Send test email
    return transporter.sendMail(mailOptions);
  })
  .then(info => {
    console.log('Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  })
  .catch(error => {
    console.error('Error:', error);
  });