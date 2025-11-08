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

  // ✅ Generate current local date-time (for restricting past dates)
  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Validate contact number (only digits)
    if (name === "contact") {
      if (!/^\d*$/.test(value)) return; // allow only digits
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Client-side Validations
    if (!form.name.trim()) {
      alert("⚠️ Full Name is required");
      return;
    }

    if (!form.contact.trim()) {
      alert("⚠️ Contact Number is required");
      return;
    }

    if (form.contact.length !== 10) {
      alert("⚠️ Contact Number must be exactly 10 digits");
      return;
    }

    if (!form.gender) {
      alert("⚠️ Please select a gender");
      return;
    }

    if (!form.appointmentTime) {
      alert("⚠️ Please select an appointment date and time");
      return;
    }

    try {
      await axios.post(
        "https://hospitalappointmentbackendapi.onrender.com/api/appointment/book",
        form
      );

      alert("✅ Appointment booked successfully!");
      setForm({
        name: "",
        contact: "",
        gender: "",
        appointmentTime: "",
        problem: "",
      });
    } catch {
      alert("❌ Failed to book appointment");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg p-8 rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
        Book an Appointment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Full Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Contact Number<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            maxLength="10"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Gender<span className="text-red-500">*</span>
          </label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Appointment Date & Time */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Appointment Date & Time<span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            name="appointmentTime"
            value={form.appointmentTime}
            onChange={handleChange}
            required
            min={getCurrentDateTime()}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Problem Description (Optional) */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Describe your problem <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            name="problem"
            value={form.problem}
            onChange={handleChange}
            placeholder="Describe your health concern..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}
