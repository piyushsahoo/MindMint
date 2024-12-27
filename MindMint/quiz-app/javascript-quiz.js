let currentQuestionIndex = 0;
let questions = [];
let correctAnswers = 0; // Variable to count the number of correct answers
let totalQuestions = 0; // Will be set dynamically based on API response

// Function to fetch questions from the API
async function fetchQuestions() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/questions/JavaScript"
    ); // API URL for JavaScript questions
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    questions = await response.json(); // Assume API returns an array of objects
    totalQuestions = questions.length; // Set total questions dynamically
    document.getElementById("total-questions").textContent = totalQuestions;
    displayQuestion();
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
    // Correct answer
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
    // Quiz completed
    localStorage.setItem("quizScore", correctAnswers); // Save the score
    localStorage.setItem("totalQuestions", totalQuestions); // Save total questions
    window.location.href = "result.html"; // Redirect to result page
  }
}

window.onload = fetchQuestions;
