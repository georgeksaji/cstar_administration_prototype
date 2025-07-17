import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage.jsx'; // Import the new Login Page
import Home from './home.jsx';          // Your existing Home component
import Student from './student.jsx';    // Your existing Student component
import Admin from './admin.jsx';        // Your existing Admin component

function App() {
  return (
    <Router>
      <Routes>
        {/* Set LoginPage as the default route */}
        <Route path="/" element={<LoginPage />} /> 
        {/* The Home page can now be accessed after login or via a specific route */}
        <Route path="/home" element={<Home />} /> 
        <Route path="/student" element={<Student />} />
        <Route path="/admin" element={<Admin />} />
        {/* Add a catch-all for undefined routes (optional) */}
        <Route path="*" element={
            <div className="text-center p-8">
              <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
              <p className="mt-4">The page you are looking for does not exist.</p>
              <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">Go to Login</Link>
            </div>
          } />
      </Routes>
    </Router>
  );
}

export default App;