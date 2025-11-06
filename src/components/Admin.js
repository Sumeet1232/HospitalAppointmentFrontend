import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://hospitalappointmentbackendapi.onrender.com/api/appointment";

  // ✅ Fetch appointments
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/all`);
      setAppointments(res.data);
    } catch (err) {
      alert("❌ Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update appointment status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/update-status/${id}`, { status: newStatus });
      alert("✅ Status updated successfully!");
      fetchAppointments();
    } catch (err) {
      alert("❌ Failed to update status");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          👨‍⚕️ Admin Dashboard
          <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md">
            Manage Appointments
          </span>
        </h2>

        {loading ? (
          <div className="text-center text-gray-600 italic">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-indigo-600 text-white text-left">
                  <th className="p-3 rounded-tl-xl">Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Gender</th>
                  <th className="p-3">Appointment Time</th>
                  <th className="p-3">Problem</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 rounded-tr-xl text-center">Actions</th>
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
                      <td className="p-3 text-gray-700">{a.contact}</td>
                      <td className="p-3 text-gray-700">{a.gender}</td>
                      <td className="p-3 text-gray-700">
                        {new Date(a.appointmentTime).toLocaleString()}
                      </td>
                      <td className="p-3 text-gray-700">{a.problem}</td>

                      {/* ✅ Status */}
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 text-sm rounded-full font-semibold ${
                            a.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : a.status === "In Progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {a.status || "Waiting"}
                        </span>
                      </td>

                      {/* ✅ Actions */}
                      <td className="p-3 text-center">
                        <select
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400"
                          value={a.status || "Waiting"}
                          onChange={(e) =>
                            updateStatus(a.id || a._id, e.target.value)
                          }
                        >
                          <option>Waiting</option>
                          <option>In Progress</option>
                          <option>Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center p-6 text-gray-500 italic"
                    >
                      No appointments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ✅ Refresh Button */}
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

export default Admin;
