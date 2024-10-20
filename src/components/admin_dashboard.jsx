import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tests, setTests] = useState([]); // State to hold fetched tests

  // Fetch tests on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/get-all-tests')
      .then(response => {
        setTests(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tests!", error);
      });
  }, []);

  const handleStartTest = (testCode) => {
    axios.post('http://localhost:5000/start-test', { testCode })
      .then(response => {
        console.log("Test Started");
        alert("Test Started!");
        // Optionally, refresh tests after starting
        fetchTests();
      })
      .catch(error => {
        console.error("Error starting the test", error);
      });
  };

  const handleEndTest = (testCode) => {
    axios.post('http://localhost:5000/end-test', { testCode })
      .then(response => {
        console.log("Test Ended");
        alert("Test Ended!");
        // Optionally, refresh tests after ending
        fetchTests();
      })
      .catch(error => {
        console.error("Error ending the test", error);
      });
  };

  const handleResetTest = (testCode) => {
    axios.post('http://localhost:5000/reset-test', { testCode })
      .then(response => {
        console.log("Test Reset");
        alert("Test Reset!");
        // Optionally, refresh tests after resetting
        fetchTests();
      })
      .catch(error => {
        console.error("Error resetting the test", error);
      });
  };

  const fetchTests = () => {
    axios.get('http://localhost:5000/get-all-tests')
      .then(response => {
        setTests(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tests!", error);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-left bg-white p-4">
      <div className="flex flex-col w-screen h-screen justify-start items-start">
        <h1 className="text-3xl font-bold h-36 text-gray-900 mb-4">Dashboard</h1>
        <label className='font-medium text-xl'>Saved Tests</label>
        <table className='table-auto border border-slate-400 w-11/12 bg-slate-200'>
          <thead>
            <tr>
              <th className='text-2xl border border-slate-400 bg-slate-500'>Test No.</th>
              <th className='text-2xl border border-slate-400 bg-slate-500'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, index) => (
              <tr key={index} className="font-medium text-center">
                <td className="border border-slate-400 bg-slate-500">
                  {test.test_code}
                </td>
                <td className="border border-slate-400">
                  {!test.is_test_started ? (
                    <button
                      onClick={() => handleStartTest(test.test_code)}
                      className="bg-green-500 text-white p-2 w-40 rounded hover:bg-green-700"
                    >
                      Start Test
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEndTest(test.test_code)}
                      className="bg-red-500 text-white p-2 w-40 rounded hover:bg-red-700"
                    >
                      End Test
                    </button>
                  )}
                  <button
                    onClick={() => handleResetTest(test.test_code)}
                    className="bg-yellow-400 text-white w-40 p-2 rounded hover:bg-yellow-700 ml-2"
                  >
                    Reset Test
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Navbar />
    </div>
  );
};

export default Dashboard;
