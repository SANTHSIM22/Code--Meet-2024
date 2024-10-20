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
    <div className=" flex  min-h-screen  items-center justify-center bg-white p-4">
      <div className="flex flex-col w-screen h-screen justify-start items-center">
      <h1 className="text-3xl font-bold h-60 text-gray-900 mb-4 align-text-top ">Dashboard</h1>
      <table className='table-auto border border-collapse border-slate-400'>
        <thead>
          <tr>
            <th className='text-2xl  border border-slate-400'>Test No.</th>
            <th className="border border-slate-400"> 
     
         

        </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-medium text-center  border border-slate-400">
              Test 1
            </td>
            <td className="flex justify-around   items-center  border border-slate-400">
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
            </td>
          </tr>
          <tr className="font-medium text-center">
            <td className=" border border-slate-400">
              Test 2
            </td>
            <td className="flex justify-around   items-center  border border-slate-400">
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
            </td>
          </tr>
          <tr className="font-medium text-center">
            <td className=" border border-slate-400">
              Test 3
            </td>
            <td className="flex justify-around   border border-slate-400 items-center">
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
            </td>
          </tr>
        </tbody>
      
      </table>
      </div>
      <Navbar/>
    </div>
  );
};

export default Dashboard;
