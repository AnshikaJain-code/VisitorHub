import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import api from '../services/api';

// NOTE: react-qr-scanner requires camera permissions and HTTPS (or localhost) to work in the browser.
const QRScanner = () => {
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  const handleScan = async (data) => {
    if (!data) return;
    try {
      const payload = JSON.parse(data.text || data);
      const res = await api.post('/pass/verify', { passNumber: payload.passNumber });
      setResult(res.data.pass);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Invalid QR code');
    }
  };

  const handleError = (err) => {
    console.error(err);
    setMessage('Camera error - check permissions');
  };

  const doCheckIn = async () => {
    await api.post('/checklog/checkin', { passNumber: result.passNumber });
    setMessage('Visitor checked in successfully.');
  };

  const doCheckOut = async () => {
    await api.post('/checklog/checkout', { passNumber: result.passNumber });
    setMessage('Visitor checked out successfully.');
  };

  return (
    <div className="max-w-md">
      <h2 className="text-xl font-bold text-gray-800 mb-6">QR Scanner</h2>
      <div className="bg-white border border-gray-100 rounded-xl p-4">
        <QrScanner
          delay={500}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>
      {message && <p className="text-sm text-primary-700 mt-4">{message}</p>}
      {result && (
        <div className="mt-4 bg-white border border-gray-100 rounded-xl p-4 text-sm space-y-2">
          <p><strong>Visitor:</strong> {result.visitorId?.name}</p>
          <p><strong>Pass No:</strong> {result.passNumber}</p>
          <p><strong>Status:</strong> {result.status}</p>
          <div className="space-x-2 mt-3">
            <button onClick={doCheckIn} className="bg-green-600 text-white text-sm px-3 py-1.5 rounded-lg">
              Check In
            </button>
            <button onClick={doCheckOut} className="bg-gray-700 text-white text-sm px-3 py-1.5 rounded-lg">
              Check Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
