const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Generates a visitor badge PDF and saves it to /uploads.
 * Returns the relative URL path to the saved PDF.
 */
const generatePassPDF = async ({ visitor, appointment, pass, host }) => {
  const fileName = `pass-${pass.passNumber}.pdf`;
  const filePath = path.join(__dirname, '..', 'uploads', fileName);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: [320, 480], margin: 20 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(18).fillColor('#1d4ed8').text('VISITOR PASS', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).fillColor('#374151').text('Visitor Pass Management System', { align: 'center' });
    doc.moveDown(1.5);

    doc.fontSize(12).fillColor('#111827');
    doc.text(`Pass No: ${pass.passNumber}`);
    doc.text(`Name: ${visitor.name}`);
    doc.text(`Company: ${visitor.company || '-'}`);
    doc.text(`Phone: ${visitor.phone}`);
    doc.text(`Host: ${host ? host.name : '-'}`);
    doc.text(`Purpose: ${appointment.purpose}`);
    doc.text(`Visit Date: ${new Date(appointment.visitDate).toLocaleDateString()}`);
    doc.text(`Valid Till: ${new Date(pass.validTill).toLocaleString()}`);
    doc.moveDown();

    // Embed QR code image (strip data URL prefix, decode base64)
    const base64Data = pass.qrCode.replace(/^data:image\/png;base64,/, '');
    const qrBuffer = Buffer.from(base64Data, 'base64');
    doc.image(qrBuffer, { fit: [140, 140], align: 'center' });

    doc.moveDown();

    doc.end();

    stream.on('finish', () => resolve(`/uploads/${fileName}`));
    stream.on('error', reject);
  });
};

module.exports = { generatePassPDF };
