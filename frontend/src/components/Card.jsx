import React from 'react';

const Card = ({ title, value, accent = 'primary' }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <p className="text-sm text-gray-500">{title}</p>
    <p className={`text-2xl font-bold mt-1 text-${accent}-700`}>{value}</p>
  </div>
);

export default Card;
