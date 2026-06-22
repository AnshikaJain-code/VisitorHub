// import React, { useEffect, useState } from 'react';
// import api from '../services/api';
// import Card from '../components/Card';

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     api
//       .get('/dashboard/stats')
//       .then((res) => setStats(res.data))
//       .catch(() => setError('Failed to load dashboard stats'));
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-bold text-gray-800 mb-6">Dashboard</h2>
//       {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card title="Total Visitors" value={stats?.totalVisitors ?? '—'} />
//         <Card title="Today's Visitors" value={stats?.todaysVisitors ?? '—'} />
//         <Card title="Active Passes" value={stats?.activePasses ?? '—'} />
//         <Card title="Check-ins Today" value={stats?.checkInsToday ?? '—'} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// // GPT
// import React from "react";

// const Dashboard = () => {
//   return (
//     <div>
//       <h1>Dashboard Working</h1>
//     </div>
//   );
// };

// export default Dashboard;



// GPT
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Card from '../components/Card';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/dashboard/stats')
      .then((res) => {
        console.log('Dashboard Response:', res.data);
        setStats(res.data);
      })
      .catch((err) => {
        console.log('Dashboard Error:', err);
        setError('Failed to load dashboard stats');
      });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Dashboard</h2>

      {error && (
        <p className="text-red-600 text-sm mb-4">{error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Visitors" value={stats?.totalVisitors ?? '—'} />
        <Card title="Today's Visitors" value={stats?.todaysVisitors ?? '—'} />
        <Card title="Active Passes" value={stats?.activePasses ?? '—'} />
        <Card title="Check-ins Today" value={stats?.checkInsToday ?? '—'} />
      </div>
    </div>
  );
};

export default Dashboard;
