/* Loader */
const loader = document.getElementById("loader");

/* Info Bar and Contents Display */
const infoBarContainer = document.getElementById("infoBar");
const scoreDisplay = document.getElementById("score");
const questionNumberDisplay = document.getElementById("questionNumber");
const questionProgressDisplay = document.getElementById("currentQuestion");
const timeLeftDisplay = document.getElementById("secondsLeft");
const timerBarFull = document.getElementById("timerBarFull");

/* Quiz Display */
const quizQuestionDisplay = document.getElementById("quizQuestion");
const quizContainer = document.getElementById("quizContainer");
const questionDisplay = document.getElementById("question");
const answerBtns = Array.from(document.getElementsByClassName("answer-btn"));

/* Final Score Display*/
const finalScoreContainer = document.getElementById("finalScoreDisplay");
const finalScoreDisplay = document.getElementById("finalScore");

const NUMBER_OF_QUESTIONS = 20;
let currentQuestion = "";
let currentAnswers = [];
let correctAnswer;
let currentQuestionNumber = 1;
let questions = [];
let score = 0;
let acceptingAnswers = false;
let timeLeft = 15;
let timer;

//Set the selected category and difficulty
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get("category");
const difficulty = urlParams.get("difficulty");

answerBtns.forEach((answerBtn) => {
  answerBtn.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    clearInterval(timer);
    acceptingAnswers = false;
    let selectedAnswer = parseInt(e.target.dataset.answer);
    if (selectedAnswer == correctAnswer) {
      e.target.classList.add("correct");
      updateScore();
    } else {
      e.target.classList.add("incorrect");
    }
    currentQuestionNumber += 1;
    setTimeout(generateNextQuestion, 2000);
  });
});

function getCategoryId(categoryName) {
  let categoryId;

  switch (categoryName) {
    case "general-knowledge":
      categoryId = 9;
      break;
    case "movies":
      categoryId = 11;
      break;
    case "nature":
      categoryId = 17;
      break;
    case "video-games":
      categoryId = 15;
      break;
    case "geography":
      categoryId = 22;
      break;
    case "history":
      categoryId = 23;
      break;
    case "sports":
      categoryId = 21;
      break;
    default:
      categoryId = 9;
  }

  return categoryId;
}

function setQuestionAndAnswers() {
  currentQuestion = questions[currentQuestionNumber - 1].question;
  currentAnswers = questions[currentQuestionNumber - 1].possibleAnswers;
  correctAnswer = questions[currentQuestionNumber - 1].correctAnswer;
}

function generateNextQuestion() {
  if (currentQuestionNumber <= NUMBER_OF_QUESTIONS) {
    resetAnswerButtons();
    setQuestionAndAnswers();
    updateQuestion();
    updateAnswers();
    acceptingAnswers = true;
    startTimer();
  } else {
    displayFinalScore();
  }
}

function startTimer() {
  timeLeft = 15;
  timeLeftDisplay.innerText = timeLeft;
  timerBarFull.style.background = "var(--green-timer-colour)";
  timerBarFull.style.width = "100%";

  timer = setInterval(() => {
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      currentQuestionNumber += 1;
      generateNextQuestion();
    }
  }, 1000);
}

function updateTimer() {
  timeLeft--;
  timeLeftDisplay.innerText = timeLeft;
  timerBarFull.style.width = `${(timeLeft / 15) * 100}%`;
  if (timeLeft < 11 && timeLeft > 5) {
    timerBarFull.style.background = "var(--yellow-timer-colour)";
  } else if (timeLeft < 6) {
    timerBarFull.style.background = "var(--red-timer-colour)";
  }
}

function resetAnswerButtons() {
  answerBtns.forEach((answerBtn) => {
    answerBtn.classList.remove("correct");
    answerBtn.classList.remove("incorrect");
  });
}

function updateQuestion() {
  questionNumberDisplay.innerText = currentQuestionNumber;
  questionDisplay.innerHTML = currentQuestion;
  questionProgressDisplay.innerText = currentQuestionNumber;
}

function updateAnswers() {
  answerBtns.forEach((answerBtn) => {
    answerNumber = answerBtn.dataset.answer;
    answerBtn.innerHTML = currentAnswers[answerNumber];
  });
}

function showQuiz() {
  quizContainer.classList.remove("hidden");
  quizContainer.classList.add("show");
}

function hideQuiz() {
  quizContainer.classList.remove("show");
  quizContainer.classList.add("hidden");
}

function showFinalScore() {
  finalScoreContainer.classList.remove("hidden");
  finalScoreContainer.classList.add("show");
  finalScoreDisplay.innerText = score;
}

function showInfoBar() {
  infoBarContainer.classList.remove("hidden");
  infoBarContainer.classList.add("show");
}

function hideInfoBar() {
  infoBarContainer.classList.remove("show");
  infoBarContainer.classList.add("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
  loader.classList.remove("show");
}

function displayFinalScore() {
  hideQuiz();
  hideInfoBar();
  showFinalScore();
}

function updateScore() {
  if (timeLeft > 10) {
    score += 30;
  } else if (timeLeft > 5) {
    score += 20;
  } else {
    score += 10;
  }
  scoreDisplay.innerText = score;
}

function startQuiz() {
  showQuiz();
  showInfoBar();
  hideLoader();
  generateNextQuestion();
}

async function getQuestions() {
  let categoryId = getCategoryId(category);
  let quizUrl = `https://opentdb.com/api.php?amount=20&category=${categoryId}&difficulty=${difficulty}&type=multiple`;

  try {
    let response = await fetch(quizUrl);
    if (response.ok) {
      let retrievedQuestions = await response.json();
      if (retrievedQuestions.response_code === 0) {
        formatQuestions(retrievedQuestions);
      } else {
        throw new Error(response.statusText);
      }
    } else {
      throw new Error(response.statusText);
    }
  } catch (err) {
    displayErrorPage();
  }
}

function formatQuestions(retrievedQuestions) {
  questions = retrievedQuestions.results.map((retrievedQuestion) => {
    const formattedQuestion = { question: retrievedQuestion.question };
    formattedQuestion.possibleAnswers = [
      ...retrievedQuestion.incorrect_answers,
    ];
    let randomAnswerIndex = Math.floor(Math.random() * 4);
    formattedQuestion.correctAnswer = randomAnswerIndex;
    formattedQuestion.possibleAnswers.splice(
      randomAnswerIndex,
      0,
      retrievedQuestion.correct_answer
    );

    return formattedQuestion;
  });

  startQuiz();
}

function displayErrorPage() {
  return window.location.replace("error.html");
}

getQuestions();
