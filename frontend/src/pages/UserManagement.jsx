import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

const UserManagement = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (formData) => {
    setError('');
    setSuccess('');

    try {
      await api.post('/users', formData);

      setSuccess('User created successfully');
      reset();
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to create user'
      );
    }
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        User Management
      </h2>

      {error && (
        <p className="text-red-600 text-sm mb-4">
          {error}
        </p>
      )}

      {success && (
        <p className="text-green-600 text-sm mb-4">
          {success}
        </p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded-xl border border-gray-100"
      >
        <input
          placeholder="Full name"
          {...register('name', { required: true })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />

        {errors.name && (
          <p className="text-xs text-red-500">
            Name is required
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />

        {errors.email && (
          <p className="text-xs text-red-500">
            Email is required
          </p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register('password', {
            required: true,
            minLength: 6,
          })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />

        {errors.password && (
          <p className="text-xs text-red-500">
            Password must be at least 6 characters
          </p>
        )}

        <select
          {...register('role', { required: true })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Select Role</option>
          <option value="employee">Employee / Host</option>
          <option value="security">Security / Frontdesk</option>
        </select>

        {errors.role && (
          <p className="text-xs text-red-500">
            Role is required
          </p>
        )}

        <input
          placeholder="Organization"
          {...register('organization')}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />

        <input
          placeholder="Phone"
          {...register('phone')}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />

        <button
          type="submit"
          className="bg-primary-600 text-white text-sm px-4 py-2 rounded-lg"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default UserManagement;