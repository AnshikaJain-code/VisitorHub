// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import api from '../services/api';

// const PassView = () => {
//   const { id } = useParams();
//   const [pass, setPass] = useState(null);

//   useEffect(() => {
//     api.get(`/pass/${id}`).then((res) => setPass(res.data));
//   }, [id]);

//   if (!pass) return <p className="text-gray-500">Loading...</p>;

//   return (
//     <div className="max-w-sm bg-white p-6 rounded-xl border border-gray-100 text-center">
//       <h2 className="text-lg font-bold text-primary-700 mb-1">Visitor Pass</h2>
//       <p className="text-xs text-gray-400 mb-4">{pass.passNumber}</p>
//       <img src={pass.qrCode} alt="QR Code" className="mx-auto w-48 h-48" />
//       <p className="text-sm text-gray-600 mt-4">{pass.visitorId?.name}</p>
//       <p className="text-xs text-gray-400">Valid till {new Date(pass.validTill).toLocaleString()}</p>
//       {pass.pdfUrl && (
//         <a
//           href={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${pass.pdfUrl}`}
//           target="_blank"
//           rel="noreferrer"
//           className="inline-block mt-4 bg-primary-600 text-white text-sm px-4 py-2 rounded-lg"
//         >
//           Download PDF
//         </a>
//       )}
//     </div>
//   );
// };

// export default PassView;





import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const PassView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pass, setPass] = useState(null);

  useEffect(() => {
    api
      .get(`/pass/${id}`)
      .then((res) => setPass(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!pass) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Loading Pass...</p>
      </div>
    );
  }

  const getStatusColor = () => {
    switch (pass.status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Used":
        return "bg-yellow-100 text-yellow-700";
      case "Expired":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 border px-4 py-2 rounded-lg hover:bg-gray-50"
      >
        ← Back
      </button>

      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-primary-700 text-center">
          Visitor Pass
        </h2>

        <p className="text-center text-gray-500 text-sm mb-4">
          {pass.passNumber}
        </p>

        <div className="flex justify-center mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}
          >
            {pass.status}
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Name:</strong> {pass.visitorId?.name}
          </p>

          <p>
            <strong>Email:</strong> {pass.visitorId?.email}
          </p>

          <p>
            <strong>Phone:</strong> {pass.visitorId?.phone}
          </p>

          <p>
            <strong>Company:</strong> {pass.visitorId?.company || "-"}
          </p>

          <p>
            <strong>Valid Till:</strong>{" "}
            {new Date(pass.validTill).toLocaleString()}
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <img
            src={pass.qrCode}
            alt="QR Code"
            className="w-48 h-48 border rounded-lg"
          />
        </div>

        {pass.pdfUrl && (
          <div className="mt-6 text-center">
            <a
              href={`http://localhost:5000${pass.pdfUrl}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg"
            >
              Download PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PassView;
