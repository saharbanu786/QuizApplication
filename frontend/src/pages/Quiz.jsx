import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { fetchQuizzes } from "../api"; // API call to get quiz data
import Navbar from "./Navbar";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false); // Track if the quiz is completed

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchQuizzes()
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load quizzes. Please try again later.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex]?.correctAnswer) {
      setCorrectAnswers((prev) => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(15);
      setSelectedAnswer(null);
    } else {
      // Set quizCompleted to true when all questions are completed
      setQuizCompleted(true);
    }
  };

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="quiz-page">
      <Navbar />
      <div className="quiz-container">
        {questions.length === 0 ? (
          <p>No quizzes available.</p>
        ) : (
          <div>
            {!quizCompleted ? (
              <div>
                <div className="question">
                  <p>{questions[currentQuestionIndex]?.question}</p>
                  <div className="options">
                    {questions[currentQuestionIndex]?.options.map((option, idx) => (
                      <button
                        key={idx}
                        className={`option-btn ${selectedAnswer === option ? "selected" : ""}`}
                        onClick={() => handleSelectAnswer(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="timer">
                  <p>Time Left: {timeLeft} seconds</p>
                </div>

                <button
                  className="next-btn"
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="quiz-results">
                <h2>Quiz Completed!</h2>
                <p>Your Score: {correctAnswers} / {questions.length}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
