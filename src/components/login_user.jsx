import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login_user = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Handle successful login (e.g., redirect)
        console.log(data.message);
        // Redirect using the URL provided in the response
        navigate(data.redirect);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      <div className="w-80 rounded-lg bg-gray-800 p-8">
        <p className="text-center text-xl font-bold">Login</p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mt-1 text-sm">
            <label htmlFor="username" className="block text-gray-400">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-gray-200 focus:border-indigo-400 focus:outline-none"
            />
          </div>
          <div className="mt-4 text-sm">
            <label htmlFor="password" className="block text-gray-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-gray-200 focus:border-indigo-400 focus:outline-none"
            />
            <div className="flex justify-end mt-2 text-xs text-gray-400">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-indigo-500 py-2 text-gray-900 font-semibold hover:bg-indigo-600"
          >
            Sign in
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        <p className="mt-4 text-center text-xs text-gray-400">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-gray-200 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login_user;
