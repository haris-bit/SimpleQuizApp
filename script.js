document.addEventListener('DOMContentLoaded', function () {
    // Embedded JSON data
    var questions = [
      {
        "question": "What does HTML stand for?",
        "options": ["Hyper Text Markup Language", "Hyper Transfer Markup Language", "Hyperlink and Text Markup Language"],
        "correctAnswer": "Hyper Text Markup Language"
      },
      {
        "question": "Which of the following is not a programming language?",
        "options": ["JavaScript", "Python", "HTML", "Java"],
        "correctAnswer": "HTML"
      },
      {
        "question": "What does CSS stand for?",
        "options": ["Counter Strike: Source", "Computer Style Sheets", "Cascading Style Sheets"],
        "correctAnswer": "Cascading Style Sheets"
      }
    ];
  
    var currentQuestion = 0;
    var score = 0;
  
    var questionContainer = document.getElementById('question-container');
    var optionsContainer = document.getElementById('options-container');
    var resultElement = document.getElementById('result');
    var nextButton = document.getElementById('nextButton');
  
    if (nextButton) {
      nextButton.addEventListener('click', function () {
        nextQuestion();
      });
    } else {
      console.error('Next button not found in the DOM.');
    }
  
    function startQuiz() {
      displayQuestion(questions[currentQuestion]);
    }
  
    function displayQuestion(question) {
      if (!questionContainer || !optionsContainer) {
        console.error('Containers not found in the DOM.');
        return;
      }
  
      questionContainer.innerHTML = question.question;
  
      optionsContainer.innerHTML = '';
      question.options.forEach((option, index) => {
        var optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.innerHTML = option;
  
        if (optionsContainer) {
          optionElement.addEventListener('click', function () {
            checkAnswer(question, index);
          });
          optionsContainer.appendChild(optionElement);
        } else {
          console.error('Options container not found in the DOM.');
        }
      });
    }
  
    function checkAnswer(question, selectedIndex) {
      if (question.correctAnswer === question.options[selectedIndex]) {
        score++;
      }
  
      if (resultElement) {
        resultElement.innerHTML = `Score: ${score}`;
      } else {
        console.error('Result element not found in the DOM.');
      }
  
      // Disable options after selection
      var options = document.querySelectorAll('.option');
      options.forEach(option => {
        if (option) {
          option.removeEventListener('click', function () {});
          option.style.cursor = 'not-allowed';
        } else {
          console.error('Option not found in the DOM.');
        }
      });
  
      // Move to the next question after a delay (for visual feedback)
      setTimeout(function () {
        nextQuestion();
      }, 1000);
    }
  
    function nextQuestion() {
      currentQuestion++;
  
      // Check if there are more questions
      if (currentQuestion < questions.length) {
        displayQuestion(questions[currentQuestion]);
      } else {
        // End of the quiz
        if (questionContainer && optionsContainer && resultElement) {
          questionContainer.innerHTML = 'Quiz Completed!';
          optionsContainer.innerHTML = '';
          resultElement.innerHTML = `Final Score: ${score}`;
          if (nextButton) {
            nextButton.style.display = 'none';
          } else {
            console.error('Next button not found in the DOM.');
          }
        } else {
          console.error('Containers or result element not found in the DOM.');
        }
      }
    }
  
    // Initialize the quiz
    startQuiz();
  });
  