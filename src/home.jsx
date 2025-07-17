// src/home.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route

// Import your page components
import LoginPage from './LoginPage.jsx'; // The new Login Page
import Student from './student.jsx';     // Your Student component
import Admin from './admin.jsx';         // Your Admin component

function Home() { // This 'Home' component is now acting as your main 'App' component
  return (
    // No <BrowserRouter> here, as it's already in main.jsx
    <Routes>
      {/* Set LoginPage as the default route for '/' */}
      <Route path="/" element={<LoginPage />} /> 
      
      {/* Define routes for Student and Admin dashboards */}
      <Route path="/student" element={<Student />} />
      <Route path="/admin" element={<Admin />} />
      
      {/* Optional: A catch-all route for 404 Not Found */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans text-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl border border-slate-200">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-gray-700 mb-6">The page you are looking for does not exist.</p>
            <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xl font-semibold transition duration-300">
              Go to Login Page
            </a>
          </div>
        </div>
      } />
    </Routes>
  );
}

export default Home; // Export Home as the main component