import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';


const McqTest = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  
  const [testCode, setTestCode] = useState(''); // User-entered test code
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(10); // Countdown state
  const warningTimeoutRef = useRef(null); // Store the timeout reference
  const countdownIntervalRef = useRef(null); // Store the countdown interval reference
  const isCountdownActiveRef = useRef(false); // Track if countdown is active

  useEffect(() => {
    // Disable right-click (context menu)
    const handleRightClick = (event) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', handleRightClick);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
    };
  }, []);

  const fetchTest = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get-test-data/${testCode}`);  // Fetch data from Flask backend
      const data = response.data;

      console.log(data)
      if (testCode == data.test_code) {
        setQuestions(data.questions);
        setIsTestStarted(true);
        enterFullscreen(); // Enter fullscreen on valid code
      }else if (!data.error) {
        setQuestions(data.questions);
        setIsTestStarted(true);
        enterFullscreen();  // Enter fullscreen on valid code
      } else {
        alert('The test code you entered is invalid. Please try again.');
        setQuestions([]);
      }
    } catch (error) {
      console.error('Error fetching test data:', error);
    }
  };

  const enterFullscreen = () => {
    const elem = document.documentElement; // Get the document element to enter fullscreen
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }

    // Reset and start the countdown
    resetCountdown();

    // Add event listener for exit fullscreen
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) { // User is not in fullscreen
      showWarning();
    } else {
      resetCountdown(); // Reset the countdown when re-entering fullscreen
    }
  };

  const showWarning = () => {
    setWarningVisible(true); // Show the warning
    setModalVisible(true); // Show the modal
    if (!isCountdownActiveRef.current) {
      startCountdown(); // Start countdown timer only if not already active
    }
  };

  const startCountdown = () => {
    setCountdown(10); // Reset countdown to 10 seconds
    isCountdownActiveRef.current = true; // Set countdown as active
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          isCountdownActiveRef.current = false; // Mark countdown as inactive
          handleSubmitTest(); // Auto submit when countdown reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetCountdown = () => {
    clearInterval(countdownIntervalRef.current); // Clear existing interval
    setCountdown(10); // Reset countdown to 10 seconds
    setWarningVisible(false); // Hide warning modal
    setModalVisible(false); // Hide modal
    isCountdownActiveRef.current = false; // Mark countdown as inactive
  };

  const handleOptionChange = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }));
    setSelectedOption(null);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const previousAnswer = answers[currentQuestionIndex - 1];
      setSelectedOption(previousAnswer || null);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitTest = () => {
    clearInterval(countdownIntervalRef.current); // Clear timer if submitting the test
    console.log('Submitted Answers:', answers);
    alert('Test submitted successfully!');
    exitFullscreen(); // Exit fullscreen after submitting
    navigate('/user'); // Redirect to user page
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }

    // Remove event listener when exiting fullscreen
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
    document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.removeEventListener('msfullscreenchange', handleFullscreenChange);
  };

  const handleTestCodeChange = (e) => {
    setTestCode(e.target.value);
  };

  const handleModalClose = () => {
    resetCountdown(); // Reset countdown when modal is closed
    startCountdown(); // Start countdown again
    enterFullscreen(); // Attempt to re-enter fullscreen
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl">
        {!isTestStarted ? (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Enter Test Code</h1>
            <input
              type="text"
              placeholder="Enter Test Code"
              value={testCode}
              onChange={handleTestCodeChange}
              className="w-full max-w-xs p-2 border rounded mb-4"
            />
            <button
              onClick={fetchTest}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit Code
            </button>
          </>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Test Code: {testCode}</h1>
            <div className="flex w-full mt-4 space-x-4">
              <div className="w-1/4 bg-white p-4 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-2">Navigate Questions</h2>
                <div className="flex flex-wrap gap-2">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      className={`px-3 py-1 border rounded ${
                        index === currentQuestionIndex ? 'bg-blue-500 text-white' : 'bg-gray-300'
                      }`}
                      onClick={() => setCurrentQuestionIndex(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-grow bg-white p-4 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-2">
                  Question {currentQuestionIndex + 1}
                </h2>
                <p className="mb-4">{questions[currentQuestionIndex]?.question}</p>
                {questions[currentQuestionIndex]?.options.map((option, index) => (
                  <div key={index} className="mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`question-${currentQuestionIndex}`}
                        checked={selectedOption === index}
                        onChange={() => handleOptionChange(index)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  </div>
                ))}

                <div className="flex justify-between mt-4">
                  <button
                    onClick={handlePrevQuestion}
                    className={`p-2 bg-gray-300 rounded ${
                      currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </button>
                  <div className="flex items-center">
                    {currentQuestionIndex < questions.length - 1 && (
                      <button
                        onClick={handleNextQuestion}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        Next
                      </button>
                    )}
                    {currentQuestionIndex === questions.length - 1 && (
                      <button
                        onClick={handleSubmitTest}
                        className="bg-green-500 text-white p-2 rounded"
                      >
                        Submit Test
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {modalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-xl font-bold mb-4">Warning</h2>
              <p>Please return to fullscreen mode. You have {countdown} seconds left.</p>
              <button
                onClick={handleModalClose}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Okay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default McqTest;
