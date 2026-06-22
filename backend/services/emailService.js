const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
  } catch (err) {
    // Email failures should not crash the request flow - log and continue
    console.error('Email send failed:', err.message);
  }
};

const sendAppointmentApprovedEmail = (visitorEmail, visitorName, visitDate) =>
  sendMail({
    to: visitorEmail,
    subject: 'Your appointment has been approved',
    html: `<p>Hi ${visitorName},</p><p>Your appointment scheduled on ${new Date(
      visitDate
    ).toLocaleDateString()} has been <strong>approved</strong>. You will receive your visitor pass shortly.</p>`,
  });

const sendAppointmentRejectedEmail = (visitorEmail, visitorName, remarks) =>
  sendMail({
    to: visitorEmail,
    subject: 'Your appointment has been rejected',
    html: `<p>Hi ${visitorName},</p><p>Unfortunately your appointment request was <strong>rejected</strong>.</p><p>Remarks: ${
      remarks || 'N/A'
    }</p>`,
  });

const sendPassIssuedEmail = (visitorEmail, visitorName, passNumber, pdfUrl, baseUrl) =>
  sendMail({
    to: visitorEmail,
    subject: 'Your visitor pass is ready',
    html: `<p>Hi ${visitorName},</p><p>Your visitor pass <strong>${passNumber}</strong> has been generated.</p><p><a href="${baseUrl}${pdfUrl}">Download your pass (PDF)</a></p>`,
  });

module.exports = {
  sendMail,
  sendAppointmentApprovedEmail,
  sendAppointmentRejectedEmail,
  sendPassIssuedEmail,
};
