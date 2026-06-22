import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ApprovalQueue = () => {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState('');

  const load = () => {
    api.get('/appointments', { params: { status: 'Pending' } }).then((res) => setAppointments(res.data));
  };

  useEffect(load, []);

  const approve = async (id) => {
    try {
      await api.patch(`/appointments/${id}/approve`);
      setMessage('Appointment approved and pass generated.');
      load();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to approve');
    }
  };

  const reject = async (id) => {
    try {
      await api.patch(`/appointments/${id}/reject`, { remarks: 'Not approved by host' });
      setMessage('Appointment rejected.');
      load();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to reject');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Approval Queue</h2>
      {message && <p className="text-sm text-primary-700 mb-4">{message}</p>}
      <div className="space-y-3">
        {appointments.length === 0 && <p className="text-gray-400 text-sm">No pending appointments.</p>}
        {appointments.map((apt) => (
          <div key={apt._id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">{apt.visitorId?.name}</p>
              <p className="text-sm text-gray-500">{apt.purpose} • {new Date(apt.visitDate).toLocaleDateString()}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => approve(apt._id)} className="bg-green-600 text-white text-sm px-3 py-1.5 rounded-lg">
                Approve
              </button>
              <button onClick={() => reject(apt._id)} className="bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalQueue;
