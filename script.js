//DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
const container = document.querySelector(".container");

const quizQuestions = [
  {
    question: "What would you do if you faced a dangerous situation?",
    answers: [
      { text: "Act immediately and face it bravely", house: "Gryffindor" },
      { text: "Think of a smart strategy before acting", house: "Ravenclaw" },
      {
        text: "Stay calm and protect everyone around you",
        house: "Hufflepuff",
      },
      { text: "Use any advantage to ensure you win", house: "Slytherin" },
    ],
  },
  {
    question: "Which class at Hogwarts would you enjoy the most?",
    answers: [
      { text: "Defense Against the Dark Arts", house: "Gryffindor" },
      { text: "Potions", house: "Slytherin" },
      { text: "Charms", house: "Ravenclaw" },
      { text: "Herbology", house: "Hufflepuff" },
    ],
  },
  {
    question: "What do you value most in a friend?",
    answers: [
      { text: "Courage and loyalty", house: "Gryffindor" },
      { text: "Intelligence and creativity", house: "Ravenclaw" },
      { text: "Kindness and patience", house: "Hufflepuff" },
      { text: "Ambition and confidence", house: "Slytherin" },
    ],
  },
  {
    question: "If you had a special power, how would you use it?",
    answers: [
      { text: "To help others and fight evil", house: "Gryffindor" },
      { text: "To gain influence and achieve success", house: "Slytherin" },
      { text: "To learn and discover new knowledge", house: "Ravenclaw" },
      {
        text: "To support and protect people you care about",
        house: "Hufflepuff",
      },
    ],
  },
  {
    question: "Which environment do you feel most comfortable in?",
    answers: [
      {
        text: "A place full of excitement and challenges",
        house: "Gryffindor",
      },
      { text: "A quiet place for thinking and learning", house: "Ravenclaw" },
      { text: "A warm and friendly community", house: "Hufflepuff" },
      { text: "A competitive and powerful environment", house: "Slytherin" },
    ],
  },
];

let currentQuestionIndex = 0;
let houseScores = { Gryffindor: 0, Ravenclaw: 0, Hufflepuff: 0, Slytherin: 0 };
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  houseScores = { Gryffindor: 0, Ravenclaw: 0, Hufflepuff: 0, Slytherin: 0 };
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
}

function showQuestion() {
  answerDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  if (!currentQuestion) return;

  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.house = answer.house;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });

  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  const progressPercent =
    (currentQuestionIndex / (quizQuestions.length - 1)) * 100;
  progressBar.style.width = progressPercent + "%";
}

function selectAnswer(event) {
  if (answerDisabled) return;
  answerDisabled = true;

  const selectedHouse = event.currentTarget.dataset.house;
  if (selectedHouse && houseScores[selectedHouse] !== undefined) {
    houseScores[selectedHouse]++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function applyHouseTheme(house) {
  container.classList.remove(
    "house-gryffindor",
    "house-ravenclaw",
    "house-hufflepuff",
    "house-slytherin"
  );
  if (!house) return;
  container.classList.add(`house-${house.toLowerCase()}`);
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  const sortedHouses = Object.entries(houseScores).sort((a, b) => b[1] - a[1]);
  const topHouse = sortedHouses[0][0];
  resultMessage.textContent = `You belong to ${topHouse}!`;
  applyHouseTheme(topHouse);
}
function restartQuiz() {
  resultScreen.classList.remove("active");
  applyHouseTheme(null);
  startQuiz();
}
