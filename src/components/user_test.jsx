import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const McqTest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const testCode = location.state?.testCode;

  // Hardcoded data for testing
  const mockData = {
    testCode: '123456',
    questions: [
      {
        question: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      },
      {
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      },
      {
        question: 'Who wrote "Hamlet"?',
        options: ['Charles Dickens', 'J.K. Rowling', 'William Shakespeare', 'Leo Tolstoy'],
      },
    ],
  };

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    // Simulate fetching the test data
    const fetchTest = () => {
      // Use the mockData to simulate a test fetch
      setQuestions(mockData.questions);
    };

    fetchTest();
  }, []);

  const handleOptionChange = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    // Save the selected answer
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }));

    // Move to the next question
    setSelectedOption(null); // Reset selected option
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
    // Display the answers or log them
    console.log('Submitted Answers:', answers);
    alert('Test submitted successfully!');
    navigate('/dashboard', { state: { testCode } });
  };

  if (questions.length === 0) {
    return <div>Loading test...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Test Code: {testCode || mockData.testCode}
      </h1>

      {/* Main container with flex row layout */}
      <div className="flex w-full max-w-6xl">
        {/* Buttons to navigate between questions */}
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

        {/* Question form section on the right */}
        <div className="w-3/4 ml-4 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            Question {currentQuestionIndex + 1}
          </h2>
          <p className="mb-4">{currentQuestion.question}</p>
          {currentQuestion.options.map((option, index) => (
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
  );
};

export default McqTest;
