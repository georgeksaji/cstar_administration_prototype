// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import your page components
// NOTE: We'll adjust student.jsx and admin.jsx to export their respective components
import StudentDashboard from './student'; // This will be the actual Student component
import AdminDashboard from './admin';     // This will be the actual Admin component
import Home from './Home';                // You can create a simple Home.jsx for the root path

function App() {
  return (
    <Router>
      <div>
        {/* Optional: A simple navigation bar for testing */}
        <nav className="p-4 bg-gray-800 text-white">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/student" className="hover:underline">Student Dashboard</Link>
            </li>
            <li>
              <Link to="/admin" className="hover:underline">Admin Dashboard</Link>
            </li>
          </ul>
        </nav>

        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Landing page */}
          <Route path="/student" element={<StudentDashboard />} /> {/* Student view */}
          <Route path="/admin" element={<AdminDashboard />} />     {/* Admin view */}
          {/* Add a 404 catch-all route */}
          <Route path="*" element={
            <div className="text-center p-8">
              <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
              <p className="mt-4">The page you are looking for does not exist.</p>
              <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">Go to Home</Link>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;