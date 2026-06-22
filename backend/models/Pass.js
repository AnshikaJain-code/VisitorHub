const mongoose = require('mongoose');

const passSchema = new mongoose.Schema(
  {
    visitorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Visitor', required: true },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    qrCode: { type: String, required: true },
    passNumber: { type: String, required: true, unique: true },
    issuedAt: { type: Date, default: Date.now },
    validTill: { type: Date, required: true },
    pdfUrl: { type: String },
    status: { type: String, enum: ['Active', 'Used', 'Expired', 'Revoked'], default: 'Active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pass', passSchema);
