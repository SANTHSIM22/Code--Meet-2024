import React from 'react';
import Navbar from './navbar'
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const questions = location.state?.questions || []; // Get questions from state
  const testCode = location.state?.testCode || 'No Code Provided'; // Get test code from state

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
    <div className=" flex  min-h-screen  items-center justify-center bg-blue-200 p-4">
      <div className="flex flex-col w-screen h-screen justify-start items-center">
      <h1 className="text-3xl font-bold h-60 text-gray-900 mb-4 align-text-top ">Dashboard</h1>
      <div className="bg-slate-100 p-4 rounded hover:shadow-2xl hover:shadow-blue-300 transition  ease-linear  w-full max-w-3xl border border-zinc-300">
        <h2 className="text-xl font-semibold mb-2">Test Code: {testCode}</h2>
        {questions.length === 0 ? (
          <p className="text-gray-600">No Questions Added</p>
        ) : (
          <p className="text-gray-600">Questions have been added.</p>
        )}
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleAddQuestion}
            className="bg-blue-500 text-white p-2 w-40 rounded"
          >
            Change Questions
          </button>
          <button
            onClick={handleStartTest}
            className="bg-green-500 text-white p-2 w-40 rounded"
          >
            Start Test
          </button>
          <button
            onClick={handleEndTest}
            className="bg-red-500 text-white p-2  w-40 rounded"
          >
            End Test
          </button>
          <button
            onClick={handleResetTest}
            className="bg-yellow-500 text-white w-40 p-2 rounded"
          >
            Reset Test
          </button>
        </div>
      </div>
      </div>
      <Navbar/>
    </div>
  );
};

export default Dashboard;
