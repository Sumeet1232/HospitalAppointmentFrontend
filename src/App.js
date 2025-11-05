import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    gender: "",
    appointmentTime: "",
    problem: "",
  });
  const [appointments, setAppointments] = useState([]);

  const API_URL = "https://hospitalappointmentbackendapi.onrender.com/api/appointment";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const bookAppointment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/book`, form);
      alert("Appointment booked successfully!");
      fetchAppointments();
    } catch (err) {
      alert("Failed to book appointment");
    }
  };

  const fetchAppointments = async () => {
    const res = await axios.get(`${API_URL}/all`);
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>🏥 Hospital Appointment Booking</h2>

      <form onSubmit={bookAppointment} style={{ marginBottom: 20 }}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="contact" placeholder="Contact" onChange={handleChange} required />
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input
          name="appointmentTime"
          type="datetime-local"
          onChange={handleChange}
          required
        />
        <input name="problem" placeholder="Problem" onChange={handleChange} required />
        <button type="submit">Book Appointment</button>
      </form>

      <h3>📋 Patient Queue</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Gender</th>
            <th>Time</th>
            <th>Problem</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a, i) => (
            <tr key={i}>
              <td>{a.name}</td>
              <td>{a.contact}</td>
              <td>{a.gender}</td>
              <td>{new Date(a.appointmentTime).toLocaleString()}</td>
              <td>{a.problem}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
