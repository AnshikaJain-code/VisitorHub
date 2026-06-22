import React, { useEffect, useState } from "react";
import api from "../services/api";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Completed: "bg-gray-100 text-gray-700",
};

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const loadAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleViewPass = async (appointmentId) => {
    try {
      const res = await api.get(
        `/pass/appointment/${appointmentId}`
      );

      navigate(`/pass/${res.data._id}`);
    } catch (err) {
      alert("Pass not found");
      console.log(err);
    }
  };

  const approveAppointment = async (id) => {
    try {
      await api.patch(`/appointments/${id}/approve`);
      alert("Appointment approved and pass generated");
      loadAppointments();
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
          "Failed to approve appointment"
      );
    }
  };

  const rejectAppointment = async (id) => {
    try {
      await api.patch(`/appointments/${id}/reject`, {
        remarks: "Rejected by admin",
      });

      alert("Appointment rejected");
      loadAppointments();
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
          "Failed to reject appointment"
      );
    }
  };

  const columns = [
    {
      key: "visitor",
      label: "Visitor",
      render: (row) => row.visitorId?.name,
    },
    {
      key: "host",
      label: "Host",
      render: (row) => row.hostId?.name,
    },
    {
      key: "purpose",
      label: "Purpose",
    },
    {
      key: "visitDate",
      label: "Visit Date",
      render: (row) =>
        new Date(row.visitDate).toLocaleDateString(),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[row.status]}`}
        >
          {row.status}
        </span>
      ),
    },

    {
  key: "actions",
  label: "Actions",
  render: (row) => (
    <div className="flex gap-2">
      {row.status === "Pending" && (
        <>
          <button
            onClick={() => approveAppointment(row._id)}
            className="bg-green-600 text-white px-3 py-1 rounded text-xs"
          >
            Approve
          </button>

          <button
            onClick={() => rejectAppointment(row._id)}
            className="bg-red-600 text-white px-3 py-1 rounded text-xs"
          >
            Reject
          </button>
        </>
      )}

      {row.status === "Approved" && (
        <button
          onClick={() => handleViewPass(row._id)}
          className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
        >
          View Pass
        </button>
      )}
    </div>
  ),
},
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Appointments
      </h2>

      <Table
        columns={columns}
        rows={appointments}
      />
    </div>
  );
};

export default AppointmentList;
