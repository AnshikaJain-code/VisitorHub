import React from 'react';

// Generic table. columns: [{ key, label, render? }]
const Table = ({ columns, rows, emptyText = 'No records found' }) => (
  <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
    <table className="min-w-full text-sm">
      <thead className="bg-gray-50 text-gray-500 text-left">
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="px-4 py-3 font-medium">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="px-4 py-6 text-center text-gray-400">
              {emptyText}
            </td>
          </tr>
        ) : (
          rows.map((row, idx) => (
            <tr key={row._id || idx} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-gray-700">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default Table;
