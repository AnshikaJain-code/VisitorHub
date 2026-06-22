import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const linksByRole = {
  admin: [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/visitors', label: 'Visitors' },
    { to: '/appointments', label: 'Appointments' },
    { to: '/logs', label: 'Check Logs' },
  ],
  security: [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/visitors', label: 'Visitors' },
    { to: '/scan', label: 'QR Scanner' },
    { to: '/logs', label: 'Check Logs' },
  ],
  employee: [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/appointments', label: 'Appointments' },
    { to: '/appointments/new', label: 'Invite Visitor' },
  ],
  visitor: [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/pass', label: 'My Pass' },
  ],
};

const Sidebar = () => {
  const { user } = useAuth();
  const links = linksByRole[user?.role] || [];

  return (
    <aside className="w-60 bg-white border-r border-gray-200 h-screen sticky top-0 hidden md:block">
      <div className="px-6 py-5 border-b border-gray-100">
        <h1 className="text-lg font-bold text-primary-700">VisitorHub</h1>
        <p className="text-xs text-gray-400">Smart Visitor Pass & Access Management System</p>
      </div>
      <nav className="px-3 py-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/appointments"}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
