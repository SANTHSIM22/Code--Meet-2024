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
    <div className=" flex  min-h-screen  items-center justify-left bg-white p-4">
      <div className="flex flex-col  w-screen h-screen justify-start items-start">
      <h1 className="text-3xl font-bold h-36 text-gray-900 mb-4  ">Dashboard</h1>
      <label className='font-medium text-xl'>Saved Tests</label>
      <table className='table-auto border  border-slate-400 w-11/12 h-44 bg-slate-200'>
        <thead>
          <tr>
            <th className='text-2xl  border border-slate-400 bg-slate-500'>Test No.</th>
           
          </tr>
        </thead>
        <tbody>
        <tr className="font-medium text-center ">
            <td className=" border border-slate-400 bg-slate-500 ">
            {testCode}
            </td>
            <td className="border border-slate-400 ">
            <button
            onClick={handleStartTest}
            className="bg-green-500 text-white p-2 w-40 rounded hover:bg-green-700"
          >
            Start Test
          </button>
          </td>
          <td className="border border-slate-400">
          <button
            onClick={handleEndTest}
            className="bg-red-500 text-white p-2  w-40 rounded hover:bg-red-700"
          >
            End Test
          </button>
          </td>
          <td className="border border-slate-400">
          <button
            onClick={handleResetTest}
            className="bg-yellow-400 text-white w-40 p-2 rounded hover:bg-yellow-700"
          >
            Reset Test
          </button>
            </td>
          </tr>
          <tr className="font-medium text-center">
            <td className=" border border-slate-400 bg-slate-500">
            {testCode}
            </td>
            <td className="border border-slate-400 ">
            <button
            onClick={handleStartTest}
            className="bg-green-500 text-white p-2 w-40 rounded hover:bg-green-700"
          >
            Start Test
          </button>
          </td>
          <td className="border border-slate-400">
          <button
            onClick={handleEndTest}
            className="bg-red-500 text-white p-2  w-40 rounded hover:bg-red-700"
          >
            End Test
          </button>
          </td>
          <td className="border border-slate-400">
          <button
            onClick={handleResetTest}
            className="bg-yellow-400 text-white w-40 p-2 rounded hover:bg-yellow-700"
          >
            Reset Test
          </button>
            </td>
          </tr>
          <tr className="font-medium text-center">
            <td className=" border border-slate-400 bg-slate-500">
            {testCode}
            </td>
            <td className="border border-slate-400 ">
            <button
            onClick={handleStartTest}
            className="bg-green-500 text-white p-2 w-40 rounded hover:bg-green-700"
          >
            Start Test
          </button>
          </td>
          <td className="border border-slate-400">
          <button
            onClick={handleEndTest}
            className="bg-red-500 text-white p-2  w-40 rounded hover:bg-red-700"
          >
            End Test
          </button>
          </td>
          <td className="border border-slate-400">
          <button
            onClick={handleResetTest}
            className="bg-yellow-400 text-white w-40 p-2 rounded hover:bg-yellow-700"
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