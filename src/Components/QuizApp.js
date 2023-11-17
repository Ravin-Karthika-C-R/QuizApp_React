import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

function QuizApp() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    fetch('/Quiz.json')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  const handleOptionChange = (optionIndex) => {
    const updatedSelectedOptions = { ...selectedOptions };
    updatedSelectedOptions[currentQuestion] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleAnswerClick = () => {
    const selectedAnswerIndex = selectedOptions[currentQuestion];
    const selectedAnswer = questions[currentQuestion]?.options[selectedAnswerIndex];

    if (selectedAnswer === questions[currentQuestion]?.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className='container'>
      {showScore ? (
        <div>
          <h2>Your Score: {score} out of {questions.length}</h2>
        </div>
      ) : (
        <div style={{ background: '#faebd7' }} className="mb-5">
          <h2  className='text-center mt-5 mb-3'>Question {currentQuestion + 1}</h2>
          <div style={{ background: '#faebd7' }}>
            <h4 className="text-dark container" style={{ textAlign: 'left' }}>
              {questions[currentQuestion]?.question}
            </h4>
            <Form className="text-dark mt-3 mb-3 container">
              {questions[currentQuestion]?.options.map((option, optionIndex) => (
                <Form.Check
                  key={optionIndex}
                  type="checkbox"
                  id={`option-${optionIndex}`}
                  label={option}
                  checked={selectedOptions[currentQuestion] === optionIndex}
                  onChange={() => handleOptionChange(optionIndex)}
                />
              ))}
            </Form>
          </div>
          <Button className=' ms-3 btn text-center mt-3 mb-5' onClick={handleAnswerClick}>
            Next Question
          </Button>
        </div>
      )}
    </div>
  );
}

export default QuizApp;
