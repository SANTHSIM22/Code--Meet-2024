import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role as 'user'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to register the user
    const response = await fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, role }),
    });

    const data = await response.json();

    if (response.ok) {
      // Successful registration, redirect to login page
      navigate('/login');
    } else {
      // Display error message
      setError(data.message || 'Registration failed');
    }
  };

  return (
    <div className = "flex justify-center items-center min-h-screen bg-gray-900 text-gray-200 bg-custom-login-pattern">
      <div className = "flex flex-col justify-center items-center  bg-gray-950 p-8 rounded-lg">

      
      <h1 className="mb-8 font-medium text-2xl  dark:text-white">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className = "mb-2 ">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="mb-4 w-80 p-2 rounded-lg text-slate-950 "
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="mb-4 w-80 p-2 rounded-lg text-slate-950"
          />
        </div>
        <div className="mb-0">
          <label htmlFor="role">Select Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-lg p-2 text-slate-950"
          >
            <option value="user" className='text-slate-950'>User</option>
            <option value="admin"className="text-slate-950">Admin</option>
          </select>
        </div>
        <button
          type="submit"
         className="mt-8 w-full rounded-md bg-green-500 py-2 text-gray-900 font-semibold hover:bg-green-600"
        >
          Register
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
    </div>
    </div>
  );
}

export default Register;