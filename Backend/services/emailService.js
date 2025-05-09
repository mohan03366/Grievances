// services/emailService.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWelcomeEmail = async (to, name) => {
  const mailOptions = {
    from: `"Complaint System" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Welcome to Complaint Management System",
    html: `<h2>Hello ${name},</h2><p>Thanks for registering with our system. You can now log complaints and track their status.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendComplaintRegisteredEmail = async (to, name, complaintId) => {
  const mailOptions = {
    to,
    from: `"Complaint System" <${process.env.EMAIL_USER}>`,
    subject: "Complaint Registered",
    html: `<h2>Hello ${name},</h2><p>Your complaint (ID: ${complaintId}) has been registered. We will process it shortly.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendStatusUpdateEmail = async (to, name, complaintId, newStatus) => {
  const mailOptions = {
    to,
    from: `"Complaint System" <${process.env.EMAIL_USER}>`,
    subject: "Complaint Status Updated",
    html: `<h2>Hello ${name},</h2><p>The status of your complaint (ID: ${complaintId}) has been updated to <strong>${newStatus}</strong>.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendWelcomeEmail,
  sendComplaintRegisteredEmail,
  sendStatusUpdateEmail,
};
