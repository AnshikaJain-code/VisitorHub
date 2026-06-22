import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Table from '../components/Table';

const VisitorList = () => {
  const [visitors, setVisitors] = useState([]);
  const [search, setSearch] = useState('');

  const load = () => {
    api.get('/visitors', { params: { search } }).then((res) => setVisitors(res.data.visitors));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'company', label: 'Company' },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <Link to={`/visitors/${row._id}`} className="text-primary-600 font-medium text-sm">
          View
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Visitors</h2>
        <Link to="/visitors/new" className="bg-primary-600 text-white text-sm px-4 py-2 rounded-lg">
          + Add Visitor
        </Link>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          load();
        }}
        className="mb-4"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, phone, company..."
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full max-w-sm"
        />
      </form>
      <Table columns={columns} rows={visitors} />
    </div>
  );
};

export default VisitorList;
