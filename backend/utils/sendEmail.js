const nodemailer = require("nodemailer");

// Gmail SMTP transporter using App Password (NOT your regular Gmail password)
// Setup steps (do this once):
// 1. Go to https://myaccount.google.com/security
// 2. Enable "2-Step Verification" on your Gmail account
// 3. Go to https://myaccount.google.com/apppasswords
// 4. Generate an App Password for "Mail" -> copy the 16-character code
// 5. Put your Gmail address in GMAIL_USER and the 16-char code (no spaces) in GMAIL_APP_PASSWORD in .env
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/**
 * Send an email.
 * @param {Object} options
 * @param {string} options.to - recipient email
 * @param {string} options.subject - email subject
 * @param {string} options.html - email HTML body
 * @param {string} [options.replyTo] - optional reply-to address
 */
const sendEmail = async ({ to, subject, html, replyTo }) => {
  try {
    await transporter.sendMail({
      from: `"Bright Futures Foundation" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    return true;
  } catch (error) {
    console.error("❌ Email send failed:", error.message);
    console.log("GMAIL_USER:", process.env.GMAIL_USER);
console.log("GMAIL_APP_PASSWORD length:", process.env.GMAIL_APP_PASSWORD?.length);
    return false;
  }
};

module.exports = sendEmail;