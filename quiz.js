const questionDisplay = document.getElementById("question");
const answerBtns = Array.from(document.getElementsByClassName("answer-btn"));
const scoreDisplay = document.getElementById("score");
const questionNumberDisplay = document.getElementById("questionNumber");
const questionProgressDisplay = document.getElementById("currentQuestion");
const timeLeftDisplay = document.getElementById("secondsLeft");
const timerBarFull = document.getElementById("timerBarFull");
const finalScoreContainer = document.getElementById("finalScoreDisplay");
const finalScoreDisplay = document.getElementById("finalScore");
const loader = document.getElementById("spinningLoader");
const quizQuestionDisplay = document.getElementById("quizQuestion");
const quizContainer = document.getElementById("quizContainer");

let currentQuestion = "";
let currentAnswers = [];
let correctAnswer;
let currentQuestionNumber = 1;
let questions = [];
score = 0;
let acceptingAnswers = false;
let timeLeft = 15;
let timer;

//Get the selected category
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

function updateTimer() {
  timeLeft--;
  timeLeftDisplay.innerText = timeLeft;
  timerBarFull.style.width = `${(timeLeft / 15) * 100}%`;
  if (timeLeft < 11 && timeLeft > 5) {
    timerBarFull.style.background = "yellow";
  } else if (timeLeft < 6) {
    timerBarFull.style.background = "red";
  }
}

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

function generateNextQuestion() {
  if (currentQuestionNumber <= 20) {
    resetQuestion();
    currentQuestion = questions[currentQuestionNumber - 1].question;
    currentAnswers = questions[currentQuestionNumber - 1].possibleAnswers;
    correctAnswer = questions[currentQuestionNumber - 1].correctAnswer;
    updateCurrentQuestion();
    updateCurrentAnswers();
    acceptingAnswers = true;
    timeLeft = 15;
    timeLeftDisplay.innerText = timeLeft;
    timerBarFull.style.background = "green";
    timerBarFull.style.width = "100%";

    timer = setInterval(() => {
      updateTimer();
      if (timeLeft <= 0) {
        clearInterval(timer);
        currentQuestionNumber += 1;
        generateNextQuestion();
      }
    }, 1000);
  } else {
    displayFinalScore();
  }
}

function resetQuestion() {
  answerBtns.forEach((answerBtn) => {
    answerBtn.classList.remove("correct");
    answerBtn.classList.remove("incorrect");
  });
}

function updateCurrentQuestion() {
  questionNumberDisplay.innerText = currentQuestionNumber;
  questionDisplay.innerHTML = currentQuestion;
  questionProgressDisplay.innerText = currentQuestionNumber;
}

function updateCurrentAnswers() {
  answerBtns.forEach((answerBtn) => {
    answerNumber = answerBtn.dataset.answer;
    answerBtn.innerHTML = currentAnswers[answerNumber];
  });
}

function displayFinalScore() {
  quizContainer.classList.remove("show");
  quizContainer.classList.add("hidden");
  finalScoreContainer.classList.remove("hidden");
  finalScoreContainer.classList.add("show");
  finalScoreDisplay.innerText = score;
}

function removeLoader() {
  loader.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  quizContainer.classList.add("show");
}

async function fetchQuestions() {
  let categoryId = getCategoryId(category);
  let quizUrl = `https://opentdb.com/api.php?amount=20&category=${categoryId}&difficulty=${difficulty}&type=multiple`;

  let response = await fetch(quizUrl);
  let retrievedQuestions = await response.json();

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

  removeLoader();
  generateNextQuestion();
}

fetchQuestions();
