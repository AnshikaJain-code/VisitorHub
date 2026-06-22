const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, required: true },
    photo: { type: String },
    address: { type: String },
    idProof: { type: String },
    company: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

visitorSchema.index({ name: 'text', email: 'text', phone: 'text', company: 'text' });

module.exports = mongoose.model('Visitor', visitorSchema);
