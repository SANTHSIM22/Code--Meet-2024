import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import FaceOrientationChecker from './video';

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
  const [countdown, setCountdown] = useState(6);
  const [remainingWarnings, setRemainingWarnings] = useState(4);
  const countdownIntervalRef = useRef(null);
  const isCountdownActiveRef = useRef(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const location = useLocation();
  const username = location.state?.username;
  useEffect(() => {
    if (!username) {
      navigate("/login_user"); // Redirect to login page
    }
  }, [username, navigate]);

  
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        //handleSubmitTest(); // Automatically submit the test if the document is hidden
      }
    };
    

    // Add event listener for visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []); //

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
    
        if (event.ctrlKey && event.altKey) {
          // Check if the Delete key (46) is pressed
          if (event.key === 'Delete') {
            // Trigger the test submission
            handleSubmitTest();
            event.preventDefault(); // Prevent the default action
          } else {
            // Optionally show a warning if only Control + Alt is pressed
            showWarning(); // Show the warning modal
            event.preventDefault();
          }
        }
        // Detect if the Windows key (meta key) is pressed
        if (event.metaKey) {
          showWarning(); // Show the warning modal and decrement warnings
          event.preventDefault();
        }
    
        // Prevent Ctrl + A / Command + A
        if ((event.ctrlKey || event.metaKey) && (event.key === 'a' || event.key === 'i' || event.key === 'c' || event.key === 'u' || event.key === 'T' || event.key === 'alt'  )) {
          event.preventDefault();
        }
    
        // Check for Alt + Tab
        if (event.altKey && event.key === 'Tab') {
          alert('Switching to another application is not allowed!'); // Show alert

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
      setRemainingWarnings((prev) => {
        const newRemaining = prev - 1;
        // Check if remaining warnings are 0 and submit test
        if (newRemaining <= 0) {
          handleSubmitTest(); // Auto-submit if warnings reach 0
        }
        return newRemaining;
      });
  
      if (!isCountdownActiveRef.current) {
        startCountdown();
      }
    } else {
      handleSubmitTest(); // Auto-submit if warnings reach 0
    }
  };

  const startCountdown = () => {
    setCountdown(6);
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
    // Store the answer using the question text
    const currentQuestion = questions[currentQuestionIndex]?.question;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion]: questions[currentQuestionIndex]?.options[selectedOption],
    }));
    
    setSelectedOption(null);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const previousQuestion = questions[currentQuestionIndex - 1]?.question;
      const previousAnswer = answers[previousQuestion];
      setSelectedOption(
        previousAnswer
          ? questions[currentQuestionIndex - 1]?.options.indexOf(previousAnswer)
          : null
      );
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const [sessionLogin, setSessionLogin] = useState('');
    useEffect(() => {
      setSessionLogin(new Date().toISOString());
    }, []);
  const [message, setMessage] = useState('');

  // Function to handle form submission

  const handleSubmitTest = async (e) => {
    e.preventDefault();
    let updatedAnswers = { ...answers };

    // Check if there is a selected option for the current question and update the answers
    if (selectedOption !== null) {
      const currentQuestion = questions[currentQuestionIndex]?.question;
      updatedAnswers[currentQuestion] = questions[currentQuestionIndex]?.options[selectedOption];
    }
        try {
            const response = await fetch('http://localhost:5000/submit-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    test_id: testCode,
                    answers: updatedAnswers,
                    session_login: sessionLogin,
                }),
            });

            if (response.ok) {
                setMessage('Test submitted successfully.');
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message}`);
            }
        } catch (error) {
            setMessage('Failed to submit the test.');
            console.error('Error submitting test:', error);
        }
      
    console.log(updatedAnswers);
    // Add a slight delay to ensure the state is updated before submission
    setTimeout(() => {
      console.log('Submitted Answers:', updatedAnswers);
      
      // Exit fullscreen and navigate away from the test page
      exitFullscreen();
      navigate('/user');
    }, 0); // Delay can be 0 since setState is asynchronous
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

  const [ip, setIp] = useState('');
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIp(data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchIp();
  }, []);
  return (
    <div className="flex user-select-none flex-col items-center justify-center bg-gray-50 p-4">
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
            <div className="flex w-full mt-4 space-x-4">
              
              <div className="flex-grow absolute left-0 w-[70%] m-8  h-[70%] bg-white p-4 rounded shadow-md">
                <div className='flex justify-between items-center  '>
                <h2 className="text-3xl font-semibold mb-2">
                  Question {currentQuestionIndex + 1}
                </h2>
                  <h1 className="text-xl font-bold text-gray-900 mb-4 text-right">Test Code: {testCode}</h1>
                  </div>
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
              <div className=" absolute bottom-0 right-0 w-1/4 h-[50%] bg-white p-4 m-4 rounded shadow-md">
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
              <div className="bg-black absolute top-0 right-2 m-8 w-[25%] h-[40%] rounded shadow-md">
                  <FaceOrientationChecker />
              </div>
              <div className="absolute flex flex-row justify-start items-center bottom-0 left-3 w-[70%] m-2  ">
                <p className="text-5xl font-medium ">Timer:</p>
                <h1 className="text-9xl">23</h1>
                <div className=" text-3xl">Minutes</div>
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
