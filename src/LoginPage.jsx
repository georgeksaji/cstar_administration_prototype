import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react'; // Icon for the login button

// Assuming cstar.png is in src/assets/
import cstarLogo from './assets/cstar.png';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent default form submission

        setError(''); // Clear previous errors

        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }

        // --- Mock Authentication Logic ---
        // In a real application, you would send these credentials to a backend server
        // and handle the response (e.g., JWT token, user data).
        if (username === 'admin' && password === 'admin') {
            // Simulate successful login
            console.log('Admin login successful!');
            navigate('/admin'); // Redirect to admin dashboard
        } else if (username === 'student' && password === 'student') {
            // Simulate successful login
            console.log('Student login successful!');
            navigate('/student'); // Redirect to student dashboard
        } else {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans">
            <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl border border-slate-200">
                <div className="flex justify-center mb-6">
                    {/* Using the imported logo */}
                    <img src={cstarLogo} alt="CSTAR Logo" className="h-16" />
                </div>
                <h2 className="text-2xl font-bold text-center text-slate-900 mb-6">Login to CSTAR Portal</h2>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label htmlFor="username" className="block text-slate-700 text-sm font-semibold mb-1">
                            Username / Email
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full p-3 border border-slate-300 rounded-md bg-white text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                            placeholder="Enter your username or email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-slate-700 text-sm font-semibold mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 border border-slate-300 rounded-md bg-white text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-md transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
                    >
                        <LogIn size={20} className="mr-2" /> Login
                    </button>
                </form>

                <p className="text-center text-slate-500 text-xs mt-6">
                    Forgot your password? <a href="#" className="text-sky-600 hover:underline">Reset here</a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;