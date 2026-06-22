import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddVisitor = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (formData) => {
    setError('');
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'photo' || key === 'idProof') {
          if (value?.[0]) data.append(key, value[0]);
        } else {
          data.append(key, value);
        }
      });

      const res = await api.post('/visitors', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(`/visitors/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create visitor');
    }
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Add Visitor</h2>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-xl border border-gray-100">
        <input placeholder="Full name" {...register('name', { required: true })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <input placeholder="Phone" {...register('phone', { required: true })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <input placeholder="Email" {...register('email')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <input placeholder="Company" {...register('company')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <input placeholder="Address" {...register('address')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <div>
          <label className="block text-sm text-gray-600 mb-1">Photo</label>
          <input type="file" accept="image/*" {...register('photo')} className="text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">ID Proof</label>
          <input type="file" accept="image/*,.pdf" {...register('idProof')} className="text-sm" />
        </div>
        <button type="submit" className="bg-primary-600 text-white text-sm px-4 py-2 rounded-lg">
          Save Visitor
        </button>
      </form>
    </div>
  );
};

export default AddVisitor;
