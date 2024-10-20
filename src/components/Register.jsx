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
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="role">Select Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Register
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
    </div>
  );
}

export default Register;
