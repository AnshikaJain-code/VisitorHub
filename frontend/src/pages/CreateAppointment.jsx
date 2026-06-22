import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreateAppointment = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [visitors, setVisitors] = useState([]);
  const [hosts, setHosts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const visitorsRes = await api.get("/visitors");
      const usersRes = await api.get("/users");

      console.log("VISITORS =", visitorsRes.data);
      console.log("USERS =", usersRes.data);

      setVisitors(visitorsRes.data.visitors);

      setHosts(
        usersRes.data.filter(
          (user) =>
            user.role === "employee" ||
            user.role === "admin"
        )
      );
    } catch (err) {
      console.log("Load Data Error:", err);
    }
  };

  const onSubmit = async (formData) => {
    setError("");

    try {
      await api.post("/appointments", formData);
      navigate("/appointments");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to create appointment"
      );
    }
  };

  console.log("visitors state =", visitors);

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Invite Visitor / Create Appointment
      </h2>

      {error && (
        <p className="text-red-600 text-sm mb-4">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded-xl border border-gray-100"
      >
        <select
          {...register("visitorId", { required: true })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Select Visitor</option>

          {visitors.map((visitor) => (
            <option
              key={visitor._id}
              value={visitor._id}
            >
              {visitor.name} - {visitor.company}
            </option>
          ))}
        </select>

        <select
          {...register("hostId", { required: true })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Select Host</option>

          {hosts.map((host) => (
            <option
              key={host._id}
              value={host._id}
            >
              {host.name} ({host.role})
            </option>
          ))}
        </select>

        <input
          placeholder="Purpose of visit"
          {...register("purpose", { required: true })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />

        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          {...register("visitDate", { required: true })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />

        <button
          type="submit"
          className="bg-primary-600 text-white text-sm px-4 py-2 rounded-lg"
        >
          Create Appointment
        </button>
      </form>
    </div>
  );
};

export default CreateAppointment;

