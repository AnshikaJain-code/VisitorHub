import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (formData) => {
    setError('');
    try {
      await registerUser(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-primary-700 mb-1">Create Account</h1>
        <p className="text-sm text-gray-500 mb-6">Register a new VPMS user</p>

        {error && <p className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            placeholder="Full name"
            {...register('name', { required: true })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: true, minLength: 6 })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <select {...register('role')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="employee">Employee / Host</option>
            <option value="security">Security / Frontdesk</option>
            <option value="admin">Admin</option>
          </select>
          <input
            placeholder="Organization"
            {...register('organization')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
