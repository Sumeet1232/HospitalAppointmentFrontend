import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookAppointment from "./components/BookAppointment";
import AdminQueue from "./components/AdminQueue"
import Admin from "./components/Admin";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* ✅ Modern Header */}
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
            {/* Hospital Name */}
            <h1 className="text-2xl font-bold tracking-wide flex items-center gap-2">
              🏥 Shree Ganesh Hospital
            </h1>

            {/* Navigation */}
            <nav className="flex gap-6">
              {/* <Link
                to="/"
                className="hover:text-yellow-300 font-medium transition"
              >
                Book Appointment
              </Link> */}
              <Link
                to="/admin"
                className="hover:text-yellow-300 font-medium transition"
              >
                Patient Queue (Admin View)
              </Link>
            </nav>
          </div>
        </header>

        {/* ✅ Page Content */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<BookAppointment />} />
            <Route path="/admin" element={<AdminQueue />} />
            <Route path="/admindashboard" element={<Admin />} />
          </Routes>
        </main>

        {/* ✅ Footer (optional for nice finish) */}
        <footer className="text-center text-gray-500 text-sm py-4 border-t mt-8">
          © {new Date().getFullYear()} Shree Ganesh Hospital. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
