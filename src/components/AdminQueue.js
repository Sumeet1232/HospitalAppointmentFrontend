import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminQueue = () => {
  const [appointments, setAppointments] = useState([]);
  const API_URL = "https://hospitalappointmentbackendapi.onrender.com/api/appointment";

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      setAppointments(res.data);
    } catch (err) {
      alert("❌ Failed to load appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          📋 Patient Appointment Queue
          {/* <span className="text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md">
            Admin View
          </span> */}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white text-left">
                <th className="p-3 rounded-tl-xl">Name</th>
                {/* <th className="p-3">Contact</th> */}
                <th className="p-3">Gender</th>
                <th className="p-3">Appointment Time</th>
                {/* <th className="p-3">Problem</th> */}
                <th className="p-3 rounded-tr-xl">Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments.length > 0 ? (
                appointments.map((a, i) => (
                  <tr
                    key={i}
                    className={`border-b hover:bg-indigo-50 transition ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-3 font-medium text-gray-800">{a.name}</td>
                    {/* <td className="p-3 text-gray-700">{a.contact}</td> */}
                    <td className="p-3 text-gray-700">{a.gender}</td>
                    <td className="p-3 text-gray-700">
                      {new Date(a.appointmentTime).toLocaleString()}
                    </td>
                    {/* <td className="p-3 text-gray-700">{a.problem}</td> */}
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 text-sm rounded-full font-semibold ${
                          a.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : a.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {a.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6 text-gray-500 italic"
                  >
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Optional Refresh Button */}
        <div className="text-right mt-6">
          <button
            onClick={fetchAppointments}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium shadow-sm"
          >
            🔄 Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminQueue;
