const QRCode = require('qrcode');

/**
 * Generates a QR code as a base64 data URL encoding the pass verification payload.
 * The payload is intentionally minimal - the scanner sends passNumber to the
 * /api/pass/verify endpoint which looks up full details server-side.
 */
const generateQRCode = async (passNumber) => {
  const payload = JSON.stringify({ passNumber });
  const qrDataUrl = await QRCode.toDataURL(payload, {
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 300,
  });
  return qrDataUrl;
};

module.exports = { generateQRCode };
