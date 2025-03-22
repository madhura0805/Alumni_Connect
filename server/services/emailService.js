import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Ensure this is set in .env
    pass: process.env.EMAIL_PASS,  // Use App Password if needed
  },
});

// ✅ Test if SMTP connection is working
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("✅ SMTP Connected Successfully!");
  }
});

// ✅ Test sending an email immediately after transporter setup
const mailOptions = {
  from: `"PICT Alumni Connect" <${process.env.EMAIL_USER}>`,
  to: "yourtestemail@gmail.com",  // Replace with your test email
  subject: "Test Email",
  text: "This is a test email to check if Nodemailer works.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("❌ Error sending test email:", error);
  } else {
    console.log("✅ Test Email Sent Successfully:", info.response);
  }
});
