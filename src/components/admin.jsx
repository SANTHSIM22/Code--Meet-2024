import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logoexam.jpg"
import Ut2 from "./underline2"


const Admin = () => {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testCode, setTestCode] = useState('');
  const location = useLocation();
  const username = location.state?.username;
  const navigate = useNavigate();
  console.log(username);
  useEffect(() => {
    if (!username) {
      navigate("/login_admin"); // Redirect to login page
    }
  }, [username, navigate]);
  // Initialize the navigation hook

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const handleTestCodeChange = (e) => {
    setTestCode(e.target.value);
  };

  const startTest = () => {
    // Handle starting the test logic
    console.log('Test Started with Code:', testCode);
    
    // Redirect to the test page (replace '/test-page' with the correct route)
    navigate('/test-page' , { state: { testCode } });
    
    closeModal();
  };
  
  

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row bg-slate-100">
          <img className=" w-16 h-16 rounded-full m-2" alt="Logo" src={logo}>
          </img>
          <h1 className="font-Zen font-medium text-end mt-6 text-2xl  ">eProctor</h1>
          
        <div className='flex-1 flex flex-col items-center justify-center'>
        {/* Sidebar: Profile Section */}
        <aside className="w-[500px] h-full absolute left-0 b p-6 shadow-2xl flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center ">
            <img
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-500"
              src="https://cdn.britannica.com/93/215393-050-E428CADE/Canadian-actor-musician-Ryan-Gosling-2016.jpg"
              alt="Profile"
            />
            <h2 className="text-xl font-bold text-gray-800 ">{username}</h2>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
          <nav className="mt-8 space-y-4 w-full">
            
            <button className="w-full px-4 py-3 bg-red-100 text-red-600 font-medium rounded-lg hover:bg-red-200 transition duration-300">
              Log Out
            </button>
          </nav>
        </aside>
        </div>

        {/* Main Section: Start Test Button */}
        <main className="flex-1 flex flex-col items-center justify-center p-8 space-y-6 mr-16 bg-{logo}">
          <Ut2/>
          <p className="text-gray-600 text-lg text-center max-w-md font-Mont">
            Click below to start your exam. Please ensure you have a stable connection and adhere to the exam guidelines.
          </p>
          <button
            className="px-10 py-4 bg-blue-600 text-white font-semibold text-lg rounded-full shadow-md hover:bg-blue-700 transition duration-300"
            onClick={openModal}
          >
            Create test
          </button>
        </main>
      <Navbar />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Create Test</h2>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter test code"
              value={testCode}
              onChange={handleTestCodeChange}
            />
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={startTest}
              >
                Start Test
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;