import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const questions = location.state?.questions || []; // Get questions from state
  const testCode = location.state?.testCode; // Get test code from state

  const handleAddQuestion = () => {
    navigate('/test', { state: { testCode } }); // Navigate to the TestPage with test code
  };

  const handleStartTest = () => {
    // Logic to start the test
    console.log("Test Started");
    alert("Test Started!");
  };

  const handleEndTest = () => {
    // Logic to end the test
    console.log("Test Ended");
    alert("Test Ended!");
  };

  const handleResetTest = () => {
    // Logic to reset the test
    console.log("Test Reset");
    alert("Test Reset!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
      <div className="bg-white p-4 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-2">Test Code: {testCode}</h2>
        <p className="text-gray-600">Test has been created!.</p>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleAddQuestion}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Change Questions
          </button>
          <button
            onClick={handleStartTest}
            className="bg-green-500 text-white p-2 rounded"
          >
            Start Test
          </button>
          <button
            onClick={handleEndTest}
            className="bg-red-500 text-white p-2 rounded"
          >
            End Test
          </button>
          <button
            onClick={handleResetTest}
            className="bg-yellow-500 text-white p-2 rounded"
          >
            Reset Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
