import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Table from '../components/Table';

const CheckLogs = () => {
  const [logs, setLogs] = useState([]);
  const [date, setDate] = useState('');

  const load = () => {
    api.get('/checklog', { params: { date } }).then((res) => setLogs(res.data));
  };

  useEffect(load, []);

  const columns = [
    { key: 'visitor', label: 'Visitor', render: (row) => row.visitorId?.name },
    { key: 'passNumber', label: 'Pass No', render: (row) => row.passId?.passNumber },
    { key: 'checkInTime', label: 'Check-In', render: (row) => row.checkInTime ? new Date(row.checkInTime).toLocaleString() : '-' },
    { key: 'checkOutTime', label: 'Check-Out', render: (row) => row.checkOutTime ? new Date(row.checkOutTime).toLocaleString() : '-' },
    { key: 'scannedBy', label: 'Scanned By', render: (row) => row.scannedBy?.name },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Check-In / Check-Out Logs</h2>
      <form onSubmit={(e) => { e.preventDefault(); load(); }} className="mb-4 flex gap-2">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <button className="bg-primary-600 text-white text-sm px-4 py-2 rounded-lg">Filter</button>
      </form>
      <Table columns={columns} rows={logs} />
    </div>
  );
};

export default CheckLogs;
