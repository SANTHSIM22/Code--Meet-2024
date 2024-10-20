import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Ut3 from "./underline3"

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
        <Ut3/>
        <label className='font-medium text-3xl font-Lex mb-2 mt-16 ml-8'>Saved Tests</label>
        <table className='table-auto border border-zinc-500 w-11/12 bg-sky-100 font-Orbitron ml-8 '>
          <thead>
            <tr>
              <th className='text-2xl border border-zinc-500 bg-zinc-300 hover:bg-zinc-400 p-2 '>Test Code</th>
              <th className='text-2xl border border-zinc-500 bg-zinc-300 hover:bg-zinc-400 p-2 '>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, index) => (
              <tr key={index} className="font-medium text-center">
                <td className="border border-zinc-500 hover:bg-sky-400  text-medium">
                  {test.test_code}
                </td>
                <td className="border border-zinc-500  flex justify-around items-center p-2">
                  {!test.is_test_started ? (
                    <button
                      onClick={() => handleStartTest(test.test_code)}
                      className="flex justify-center items-center bg-green-500 text-white p-2 w-40 rounded-xl hover:bg-green-700 " 
                    ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                  </svg>
                  
                      Start Test
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEndTest(test.test_code)}
                      className="bg-red-500 flex justify-center items-center text-white p-2 w-40 rounded-xl hover:bg-red-700"
                    ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
                  </svg>
                  
                  
                      
                      End Test
                    </button>
                  )}
                  <button
                    onClick={() => handleResetTest(test.test_code)}
                    className="bg-yellow-400 flex justify-center items-center text-white w-40 p-2 rounded-xl hover:bg-yellow-700 ml-2"
                  ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6  mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                </svg>
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
