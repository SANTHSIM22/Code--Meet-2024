import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const McqTest = () => {
  const navigate = useNavigate();

  const [testCode, setTestCode] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [remainingWarnings, setRemainingWarnings] = useState(4);
  const countdownIntervalRef = useRef(null);
  const isCountdownActiveRef = useRef(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleRightClick = (event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event) => {
      if (isFullscreen) {
        const charCode = event.charCode || event.keyCode || event.which;

        // Check for the Escape key (27)
        if (charCode === 27) {
          alert('Escape key is not allowed');
          event.preventDefault();
        }

        // Detect if the Windows key (meta key) is pressed
        if (event.metaKey) {
          // Decrease warning count when the Windows key is pressed
          showWarning(); // Show the warning modal and decrement warnings
          event.preventDefault();
        }

        // Prevent Ctrl + A / Command + A
        if ((event.ctrlKey || event.metaKey) && (event.key === 'a' || event.key === 'i' || event.key === 'c' || event.key === 'u')) {
          event.preventDefault();
        }

        // Prevent Alt + Tab and the Tab key
        if (event.altKey && event.key === 'Tab') {
          event.preventDefault();
        }

        // Prevent Ctrl + Tab (switching tabs)
        if (event.ctrlKey && event.key === 'Tab') {
          event.preventDefault();
        }

        // Prevent both Control and Alt keys
        if (event.ctrlKey || event.altKey) {
          event.preventDefault();
        }
      }
    };

    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

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
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    setIsFullscreen(true);
    resetCountdown();
    document.addEventListener('fullscreenchange', handleFullscreenChange);
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      showWarning();
      setIsFullscreen(false);
    } else {
      resetCountdown();
      setIsFullscreen(true);
    }
  };

  const showWarning = () => {
    if (remainingWarnings > 0) {
      setWarningVisible(true);
      setModalVisible(true);
      setRemainingWarnings((prev) => prev -1);

      if (!isCountdownActiveRef.current) {
        startCountdown();
      }
    } else {
      handleSubmitTest(); // Auto-submit if warnings reach 0
    }
  };

  const startCountdown = () => {
    setCountdown(10);
    isCountdownActiveRef.current = true;
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          isCountdownActiveRef.current = false;
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetCountdown = () => {
    clearInterval(countdownIntervalRef.current);
    setCountdown(10);
    setWarningVisible(false);
    setModalVisible(false);
    isCountdownActiveRef.current = false;
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
    clearInterval(countdownIntervalRef.current);
    console.log('Submitted Answers:', answers);
    alert('Test submitted successfully!');
    exitFullscreen();
    navigate('/user');
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    document.removeEventListener('fullscreenchange', handleFullscreenChange);
  };

  const handleTestCodeChange = (e) => {
    setTestCode(e.target.value);
  };

  const handleModalClose = () => {
    if (remainingWarnings === 0) {
      handleSubmitTest();
    } else {
      resetCountdown();
      startCountdown();
      enterFullscreen();
    }
  };

  return (
    <div className="min-h-screen flex user-select-none flex-col items-center justify-center bg-gray-50 p-4">
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
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </button>
                  <button
                    onClick={
                      currentQuestionIndex === questions.length - 1
                        ? handleSubmitTest
                        : handleNextQuestion
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    {currentQuestionIndex === questions.length - 1 ? 'Submit Test' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Warning Modal */}
        {modalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-lg w-1/2">
              <h2 className="text-2xl font-bold mb-4">Warning</h2>
              <p>
                You've exited fullscreen mode. Please return to fullscreen to continue the test. You have{' '}
                {remainingWarnings} warnings left. The test will be submitted in {countdown} seconds if you don't return
                to fullscreen.
              </p>
              <div className="flex justify-end mt-4">
                <button onClick={handleModalClose} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Return to Fullscreen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default McqTest;
