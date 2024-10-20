import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login_admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to log in
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Successful login, redirect to the dashboard or admin page
      navigate("/admin"); // Adjust this path as needed
    } else {
      // Display error message
      setError(data.error || "Login failed");
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
                  placeholder=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-gray-200 focus:border-indigo-400 focus:outline-none"
                  required
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
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-gray-200 focus:border-indigo-400 focus:outline-none"
                  required
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
          <div className="flex items-center my-4">
            <span className="w-full h-px bg-gray-600"></span>
            <span className="px-3 text-sm text-gray-400">Login with social accounts</span>
            <span className="w-full h-px bg-gray-600"></span>
          </div>
          <div className="flex justify-center space-x-3">
            {/* Social login buttons can go here */}
          </div>
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
          <p className="mt-4 text-center text-xs text-gray-400">
            Don't have an account?{" "}
            <a href="/register" className="text-gray-200 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
  );
};

export default Login_admin;
