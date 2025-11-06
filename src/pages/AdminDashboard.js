import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const res = await axios.get("https://hospitalappointmentbackendapi.onrender.com/api/appointment/all");
    setAppointments(res.data);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Patient Queue</h2>
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th>Contact</th>
            <th>Gender</th>
            <th>Appointment</th>
            <th>Problem</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a, i) => (
            <tr key={i} className="border-t text-center">
              <td className="p-2">{a.name}</td>
              <td>{a.contact}</td>
              <td>{a.gender}</td>
              <td>{new Date(a.appointmentTime).toLocaleString()}</td>
              <td>{a.problem}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
