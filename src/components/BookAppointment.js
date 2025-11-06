import React, { useState } from "react";
import axios from "axios";

export default function BookAppointment() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    gender: "",
    appointmentTime: "",
    problem: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://hospitalappointmentbackendapi.onrender.com/api/appointment/book", form);
      alert("✅ Appointment booked successfully!");
      setForm({ name: "", contact: "", gender: "", appointmentTime: "", problem: "" });
    } catch {
      alert("❌ Failed to book appointment");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg p-8 rounded-2xl">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Book an Appointment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={form.name} onChange={handleChange}
          placeholder="Full Name" required className="w-full p-3 border rounded-lg" />

        <input type="tel" name="contact" value={form.contact} onChange={handleChange}
          placeholder="Contact Number" required className="w-full p-3 border rounded-lg" />

        <select name="gender" value={form.gender} onChange={handleChange}
          required className="w-full p-3 border rounded-lg">
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input type="datetime-local" name="appointmentTime" value={form.appointmentTime}
          onChange={handleChange} required className="w-full p-3 border rounded-lg" />

        <textarea name="problem" value={form.problem} onChange={handleChange}
          placeholder="Describe your problem" required className="w-full p-3 border rounded-lg"></textarea>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Book Appointment
        </button>
      </form>
    </div>
  );
}
