import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import VisitorList from './pages/VisitorList';
import AddVisitor from './pages/AddVisitor';
import VisitorDetails from './pages/VisitorDetails';
import AppointmentList from './pages/AppointmentList';
import CreateAppointment from './pages/CreateAppointment';
import ApprovalQueue from './pages/ApprovalQueue';
import PassView from './pages/PassView';
import QRScanner from './pages/QRScanner';
import CheckLogs from './pages/CheckLogs';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

const Layout = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 min-h-screen">
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/visitors"
        element={
          <ProtectedRoute roles={['admin', 'security', 'employee']}>
            <Layout>
              <VisitorList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/visitors/new"
        element={
          <ProtectedRoute roles={['admin', 'security', 'employee']}>
            <Layout>
              <AddVisitor />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/visitors/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <VisitorDetails />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <Layout>
              <AppointmentList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointments/new"
        element={
          <ProtectedRoute roles={['admin', 'security', 'employee']}>
            <Layout>
              <CreateAppointment />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/approvals"
        element={
          <ProtectedRoute roles={['admin', 'employee']}>
            <Layout>
              <ApprovalQueue />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/pass/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <PassView />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/scan"
        element={
          <ProtectedRoute roles={['admin', 'security']}>
            <Layout>
              <QRScanner />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/logs"
        element={
          <ProtectedRoute roles={['admin', 'security']}>
            <Layout>
              <CheckLogs />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
