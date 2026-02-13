import React, { useState, useEffect } from 'react';
import './App.css';
import anuliThePunuli from './assets/anuli-the-punuli.jpg';
import clareValley from './assets/clare-valley.jpg';
import harryPotter from './assets/harry-potter.jpg';
import alooPoha from './assets/poha.jpg';
import sunit1 from './assets/sunit1.jpg';
import sunit2 from './assets/sunit2.jpg';
import sunit3 from './assets/sunit3.jpg';
import valentineKiss from './assets/valentine-kiss.jpg';

const question = [
  {
    id: 1,
    text: "What's your FULL nickname?",
    answers: [
      { text: 'anuli the punuli', correct: true },
    ],
    img: [
      { src: anuliThePunuli, alt: 'anuli the punuli' },
    ]
  },
  {
    id: 2,
    text: "Where was our first Airbnb getaway?",
    answers: [
      { text: 'Clare Valley', correct: true },
      { text: 'Cape Douglas', correct: false },
      { text: 'Surfers Paradise', correct: false },
      { text: 'Deep Creek', correct: false },
    ],
    img: [
      { src: clareValley, alt: 'clare valley' },
    ]
  },
  {
    id: 3,
    text: "Which movie series did we binge watch together?",
    answers: [
      { text: 'How To Train Your Dragon', correct: false },
      { text: 'F1', correct: false },
      { text: 'Harry Potter', correct: true },
      { text: 'Suits', correct: false },
    ],
    img: [
      { src: harryPotter, alt: 'harry potter' },
    ]
  },
  {
    id: 4,
    text: "What food do you make that I absolutely love?",
    answers: [
      { text: 'Rice & Masoor Daal', correct: false },
      { text: 'Aloo Poha', correct: true },
      { text: 'Low Cal Pizza', correct: false },
      { text: 'Cheese Board', correct: false },
    ],
    img: [
      { src: alooPoha, alt: 'aloo poha' },
    ]
  },
  {
    id: 5,
    text: "What do you most love about me?",
    answers: [
      { text: 'Goofiness', correct: false },
      { text: 'Ambition', correct: false },
      { text: 'Humour', correct: false },
      { text: 'Looks', correct: false },
      { text: 'Dedication', correct: false },
      { text: 'Intelligence', correct: false },
      { text: 'Kindness', correct: false },
      { text: 'Generosity', correct: false },
      { text: 'Honesty', correct: false },
      { text: 'Trustworthiness', correct: false },
      { text: 'Courage', correct: false },
      { text: 'All of the above', correct: true },
    ],
    img: [
      { src: sunit1, alt: 'Sunit 1' },
      { src: sunit2, alt: 'Sunit 2' },
      { src: sunit3, alt: 'Sunit 3' },
    ]
  },
  {
    id: 6,
    text: "Will you be my valentine cutie?",
    answers: [
      { text: 'Yes', correct: true },
      { text: 'No', correct: false },
    ],
    img: [
      { src: valentineKiss, alt: 'valentine kiss' },
    ]
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // New state variables
  const [inputValue, setInputValue] = useState(""); // For ID 1
  const [selectedButton, setSelectedButton] = useState(null); // For IDs 2-4
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]); // For ID 5
  const [disappointmentIndex, setDisappointmentIndex] = useState(0); // For ID 6
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // For ID 5 image rotation
  const [errorMessageIndex, setErrorMessageIndex] = useState(0); // For ID 5 error message rotation
  const [showImage, setShowImage] = useState(false); // Control image visibility
  const [countdown, setCountdown] = useState(null); // For countdown timer on success messages
  const [id6YesSelected, setId6YesSelected] = useState(false); // Track if ID 6 "Yes" was selected

  // Disappointment messages for ID 6
  const disappointmentMessages = [
    "Really? 😢",
    "Come on... 😔",
    "You're breaking my heart 💔",
    "Please say yes? 🥺"
  ];

  // Error messages for ID 5
  const id5ErrorMessages = [
    "WTF you mean? What about the others?",
    "Nahhh, you're missing something important! 😤",
    "Come on, think harder! You know this! 🤔",
    "That's not right... try again! 😏",
    "You're so close! Just check them all! 💭"
  ];

  // Auto-advance on success message with countdown
  useEffect(() => {
    if (successMessage && currentQuestion < question.length) {
      const questionId = question[currentQuestion].id;
      
      // Don't auto-advance for ID 6
      if (questionId === 6) {
        return;
      }
      
      // 5 seconds countdown for all questions (IDs 1-5)
      let delay = 5000;
      let countdownSeconds = 5;
      
      // Start countdown
      setCountdown(countdownSeconds);
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
      
      const timer = setTimeout(() => {
        if (currentQuestion < question.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSuccessMessage("");
          setErrorMessage("");
          setInputValue("");
          setSelectedButton(null);
          setSelectedCheckboxes([]);
          setShowImage(false);
          setCurrentImageIndex(0);
          setErrorMessageIndex(0);
          setDisappointmentIndex(0);
          setCountdown(null);
        }
        clearInterval(countdownInterval);
      }, delay);

      return () => {
        clearTimeout(timer);
        clearInterval(countdownInterval);
      };
    }
  }, [successMessage, currentQuestion]);

  // Handle ID 1: Input field submission
  const handleInputSubmit = () => {
    const currentQ = question[currentQuestion];
    const correctAnswer = currentQ.answers.find(a => a.correct);
    
    if (inputValue.trim().toLowerCase() === correctAnswer.text.toLowerCase()) {
      setSuccessMessage("You know what's upppp ma G!");
      setErrorMessage("");
      setShowImage(false);
    } else {
      setErrorMessage("Nahhhh wtf?!! Get serious!");
      setSuccessMessage("");
      setShowImage(true);
    }
  };

  // Handle IDs 2-4: Button selection
  const handleButtonClick = (answer) => {
    setSelectedButton(answer.text);
    
    if (answer.correct) {
      const questionId = question[currentQuestion].id;
      switch (questionId) {
        case 2:
          setSuccessMessage("Had some intense sex offftt :P");
          break;
        case 3:
          setSuccessMessage("That's how I reeled you in. Learnt the magic from Harry Potter ;)");
          break;
        case 4:
          setSuccessMessage("I'm stocking on the ingredients so you cook for me when you come melbs hehe");
          break;
      }
      setErrorMessage("");
      setShowImage(false);
    } else {
      const questionId = question[currentQuestion].id;
      switch (questionId) {
        case 2:
          setErrorMessage("What a shame?! You don't remember?");
          break;
        case 3:
          setErrorMessage("Tsk Tsk. Disappointment is real...");
          break;
        case 4:
          setErrorMessage("Nahhh dude. It's probably one reason that kept me with you for soo long!");
          break;
      }
      setSuccessMessage("");
      setShowImage(true);
    }
  };

  // Handle ID 5: Checkbox change
  const handleCheckboxChange = (answerText) => {
    if (answerText === 'All of the above') {
      // If "All of the above" is checked, check all boxes
      if (selectedCheckboxes.includes('All of the above')) {
        // Unchecking "All of the above" - uncheck everything
        setSelectedCheckboxes([]);
      } else {
        // Checking "All of the above" - check all boxes
        const allAnswers = question[currentQuestion].answers.map(a => a.text);
        setSelectedCheckboxes(allAnswers);
      }
    } else {
      // Toggle individual checkbox
      // If "All of the above" is currently selected, uncheck it first
      const hasAllOfAbove = selectedCheckboxes.includes('All of the above');
      
      if (selectedCheckboxes.includes(answerText)) {
        // Unchecking this box
        if (hasAllOfAbove) {
          // If "All of the above" was checked, uncheck it and uncheck this box
          setSelectedCheckboxes(selectedCheckboxes.filter(cb => cb !== answerText && cb !== 'All of the above'));
        } else {
          // Just uncheck this box
          setSelectedCheckboxes(selectedCheckboxes.filter(cb => cb !== answerText));
        }
      } else {
        // Checking this box
        if (hasAllOfAbove) {
          // If "All of the above" was checked, uncheck it and check this box
          setSelectedCheckboxes([answerText]);
        } else {
          // Just check this box
          setSelectedCheckboxes([...selectedCheckboxes, answerText]);
        }
      }
    }
  };

  // Handle ID 5: Checkbox submit
  const handleCheckboxSubmit = () => {
    const allAnswers = question[currentQuestion].answers.map(a => a.text);
    const allSelected = allAnswers.every(answer => selectedCheckboxes.includes(answer));
    
    if (allSelected && selectedCheckboxes.length === allAnswers.length) {
      setSuccessMessage("...staphhhhh I'm shyyy now hehehe");
      setErrorMessage("");
      setShowImage(false);
      setErrorMessageIndex(0); // Reset error message index on success
    } else {
      // Rotate both image and error message
      // Show current error message, then increment for next time
      setErrorMessage(id5ErrorMessages[errorMessageIndex]);
      setCurrentImageIndex((prev) => (prev + 1) % 3);
      setErrorMessageIndex((prev) => (prev + 1) % id5ErrorMessages.length);
      setSuccessMessage("");
      setShowImage(true);
    }
  };

  // Handle ID 6: Yes/No click
  const handleYesNoClick = (answer) => {
    if (answer.text === 'Yes' && answer.correct) {
      setId6YesSelected(true);
      setSuccessMessage("You're the finest, loveliest, tenderest and most beautiful person I have ever known and even that is an understatement! I loveeeeee daruuuuuu!💕 😘💋");
      setErrorMessage("");
      setShowImage(true);
      setDisappointmentIndex(0);
    } else if (answer.text === 'No') {
      setErrorMessage(disappointmentMessages[disappointmentIndex]);
      setSuccessMessage("");
      setShowImage(false);
      setDisappointmentIndex((prev) => (prev + 1) % disappointmentMessages.length);
    }
  };

  const currentQ = question[currentQuestion];
  if (!currentQ) {
    return (
      <div className="App">
        <div className="question">
          <h2>You've completed all questions! 💕</h2>
        </div>
      </div>
    );
  }

  const renderQuestion = () => {
    switch (currentQ.id) {
      case 1:
        return (
          <div key={currentQ.id}>
            <h2>{currentQ.text}</h2>
            <div className="input-container">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
                placeholder="Type your answer..."
                className="answer-input"
              />
              <button onClick={handleInputSubmit} className="go-button">
                Go
              </button>
            </div>
            {showImage && errorMessage && (
              <div className="image-error-container">
                <img src={currentQ.img[0].src} alt={currentQ.img[0].alt} className="question-image" />
                <p className="error-message">{errorMessage}</p>
              </div>
            )}
            {successMessage && (
              <p className="success-message">
                {successMessage}
                {countdown !== null && <span className="countdown"> ({countdown})</span>}
              </p>
            )}
          </div>
        );

      case 2:
      case 3:
      case 4:
        return (
          <div key={currentQ.id}>
            <h2>{currentQ.text}</h2>
            <div className="answers">
              {currentQ.answers.map((answer) => (
                <button
                  key={answer.text}
                  onClick={() => handleButtonClick(answer)}
                  disabled={successMessage !== ""}
                  className={selectedButton === answer.text ? 'selected' : ''}
                >
                  {answer.text}
                </button>
              ))}
            </div>
            {showImage && errorMessage && (
              <div className="image-error-container">
                <img src={currentQ.img[0].src} alt={currentQ.img[0].alt} className="question-image" />
                <p className="error-message">{errorMessage}</p>
              </div>
            )}
            {successMessage && (
              <p className="success-message">
                {successMessage}
                {countdown !== null && <span className="countdown"> ({countdown})</span>}
              </p>
            )}
          </div>
        );

      case 5:
        return (
          <div key={currentQ.id}>
            <h2>{currentQ.text}</h2>
            <div className="checkbox-container">
              {currentQ.answers.map((answer) => (
                <label key={answer.text} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedCheckboxes.includes(answer.text)}
                    onChange={() => handleCheckboxChange(answer.text)}
                    className="checkbox-input"
                  />
                  <span>{answer.text}</span>
                </label>
              ))}
            </div>
            <button onClick={handleCheckboxSubmit} className="submit-button">
              Submit
            </button>
            {showImage && errorMessage && (
              <div className="image-error-container">
                <img 
                  src={currentQ.img[currentImageIndex].src} 
                  alt={currentQ.img[currentImageIndex].alt} 
                  className="question-image" 
                />
                <p className="error-message">{errorMessage}</p>
              </div>
            )}
            {successMessage && (
              <p className="success-message">
                {successMessage}
                {countdown !== null && <span className="countdown"> ({countdown})</span>}
              </p>
            )}
          </div>
        );

      case 6:
        // If "Yes" was selected, only show image and message (hide question and buttons)
        if (id6YesSelected && showImage) {
          return (
            <div key={currentQ.id} className="id6-final-view">
              <div className="image-success-container">
                <img src={currentQ.img[0].src} alt={currentQ.img[0].alt} className="question-image" />
                <p className="success-message">{successMessage}</p>
              </div>
            </div>
          );
        }
        
        // Normal view with question and buttons
        return (
          <div key={currentQ.id}>
            <h2>{currentQ.text}</h2>
            <div className="answers">
              {currentQ.answers.map((answer) => (
                <button
                  key={answer.text}
                  onClick={() => handleYesNoClick(answer)}
                  className={answer.text === 'Yes' ? 'yes-button' : 'no-button'}
                >
                  {answer.text}
                </button>
              ))}
            </div>
            {errorMessage && !showImage && (
              <p className="error-message">{errorMessage}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '10px',
          margin: '0 auto'
        }}
      >
        <div className="question">
          {renderQuestion()}
        </div>
      </div>
    </div>
  );
}

export default App;
