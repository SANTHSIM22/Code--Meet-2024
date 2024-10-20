import React, { useState } from 'react';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

const User = () => {
    // State to control modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [testCode, setTestCode] = useState('');
    
    // Initialize the navigation hook
    const navigate = useNavigate();
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    const handleTestCodeChange = (e) => {
      setTestCode(e.target.value);
    };
  
    const startTest = () => {
      // Handle starting the test logic
      console.log('Test Started with Code:', testCode);
      
      // Redirect to the test page (replace '/test-page' with the correct route)
      navigate('/test', { state: { testCode } });
        
      closeModal();
    };
  
    return (
      <>
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
          {/* Sidebar: Profile Section */}
          <aside className="w-full md:w-64 bg-white p-6 shadow-lg">
            <div className="flex flex-col justify-center items-center ">
              <img
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-500"
                src="https://cdn.britannica.com/93/215393-050-E428CADE/Canadian-actor-musician-Ryan-Gosling-2016.jpg"
                alt="Profile"
              />
              <h2 className="text-xl font-bold text-gray-800">John Doe</h2>
              <p className="text-sm text-gray-500">Student</p>
            </div>
            <nav className="mt-8 space-y-4 w-full">
              <button className="w-full px-4 py-3 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition duration-300">
                View Profile
              </button>
              <button className="w-full px-4 py-3 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition duration-300">
                Log Out
              </button>
            </nav>
          </aside>
  
          {/* Main Section: Start Test Button */}
          <main className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 tracking-wide">
              Welcome to the Exam Portal
            </h1>
            <p className="text-gray-600 text-lg text-center max-w-md">
              Enter the exam code below and Click on start exam. Please ensure you have a stable connection and adhere to the exam guidelines.
            </p>
            <button
              className="px-10 py-4 bg-blue-600 text-white font-semibold text-lg rounded-full shadow-md hover:bg-blue-700 transition duration-300"
              onClick={openModal}
            >
              Start Exam
            </button>
          </main>
        <Navbar />
        </div>
  
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
              <h2 className="text-xl font-bold mb-4">Start exam</h2>
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
  
  export default User;