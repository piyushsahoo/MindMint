let currentQuestionIndex = 0;
let questions = [];
let correctAnswers = 0; // Variable to count the number of correct answers
let totalQuestions = 0; // Will be set dynamically based on API response
let timeRemaining = 60; // Total time in seconds for the quiz
let timerInterval = null; // Reference to the timer interval
const timerElement = document.getElementById("timer");

// Function to fetch questions from the API
async function fetchQuestions() {
  try {
    const response = await fetch("http://localhost:8080/api/questions/Java"); // API URL
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    questions = await response.json(); // Assume API returns an array of objects
    totalQuestions = questions.length; // Set total questions dynamically
    document.getElementById("total-questions").textContent = totalQuestions;
    displayQuestion();
    startTimer(); // Start the timer when questions are loaded
  } catch (error) {
    console.error("Error fetching questions:", error);
    document.getElementById("question-text").textContent =
      "Failed to load questions. Please try again later.";
  }
}

// Function to display the current question
function displayQuestion() {
  if (questions.length === 0) return;
  const questionText = document.getElementById("question-text");
  const currentQuestion = questions[currentQuestionIndex];
  const optionsContainer = document.getElementById("options-container");

  questionText.textContent = currentQuestion.questionText;
  optionsContainer.innerHTML = ""; // Clear previous options

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.className = "option";
    button.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(button);
  });
  document.getElementById("current-question").textContent =
    currentQuestionIndex + 1;
}

// Function to check if the selected answer is correct
function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.correctAnswer) {
    correctAnswers++;
  }
  nextQuestion();
}

// Function to move to the next question or finish the quiz
function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  } else {
    saveQuizResult(); // End the quiz when all questions are answered
  }
}

// Function to save the quiz result and redirect
function saveQuizResult() {
  clearInterval(timerInterval); // Stop the timer
  localStorage.setItem("quizScore", correctAnswers); // Save the score
  localStorage.setItem("totalQuestions", totalQuestions); // Save total questions
  window.location.href = "result.html"; // Redirect to result page
}

// Function to format time as "minutes:seconds"
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Function to update the timer every second
function startTimer() {
  timerElement.textContent = formatTime(timeRemaining); // Initialize display
  timerInterval = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      timerElement.textContent = formatTime(timeRemaining);
    } else {
      clearInterval(timerInterval); // Stop the timer when time runs out
      saveQuizResult(); // Save the result and redirect to result page
    }
  }, 1000);
}

// Initialize the quiz when the page loads
window.onload = fetchQuestions;
