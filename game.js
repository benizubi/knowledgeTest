const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

//
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
// the counter for the question number and score collected by id
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];
fetch(
  'https://opentdb.com/api.php?amount=20&category=9&difficulty=medium'
)
  .then((res) => {
      return res.json();
  })
  .then((loadedQuestions) => {
      questions = loadedQuestions.results.map((loadedQuestion) => {
          const formattedQuestion = {
              question: loadedQuestion.question,
          };

          const answerChoices = [...loadedQuestion.incorrect_answers];
          formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
          answerChoices.splice(
              formattedQuestion.answer - 1,
              0,
              loadedQuestion.correct_answer
          );

          answerChoices.forEach((choice, index) => {
              formattedQuestion['choice' + (index + 1)] = choice;
          });

          return formattedQuestion;
      });
      startGame();
  })
  .catch((err) => {
      console.error(err);
  });
// fetch and always return something to catch e.g error 

;
// loading questions from the questions json file
//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 20;
// set the default to be 10 for every right answer.
//set max question numbers.

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};
// start take set to 0 and will get new question in random order each time we start.

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //if all selected quesitoned are done, return end of the game.
    localStorage.setItem("mostRecentScore", score);
    // collecting the recentscore after all question completed 
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText ="Question  "
  + questionCounter + "/" + MAX_QUESTIONS;

//update for the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100 }%`;
  // style is how to change the css properties.
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    // if the answer is corrct increase the bonus the initial bonus num

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

