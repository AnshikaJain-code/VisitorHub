import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useNavigate } from "react-router-dom";

const VisitorDetails = () => {
  const { id } = useParams();
  const [visitor, setVisitor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/visitors/${id}`).then((res) => setVisitor(res.data));
  }, [id]);

  if (!visitor) return <p className="text-gray-500">Loading...</p>;

  return (
    
    <div className="max-w-lg bg-white p-6 rounded-xl border border-gray-100">
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 border rounded-lg hover:bg-gray-50"> ← Back </button>
      <h2 className="text-xl font-bold text-gray-800 mb-4">{visitor.name}</h2>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between"><dt className="text-gray-500">Phone</dt><dd>{visitor.phone}</dd></div>
        <div className="flex justify-between"><dt className="text-gray-500">Email</dt><dd>{visitor.email || '-'}</dd></div>
        <div className="flex justify-between"><dt className="text-gray-500">Company</dt><dd>{visitor.company || '-'}</dd></div>
        <div className="flex justify-between"><dt className="text-gray-500">Address</dt><dd>{visitor.address || '-'}</dd></div>
      </dl>
    </div>
  );
};

export default VisitorDetails;
