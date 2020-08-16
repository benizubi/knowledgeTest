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

let questions = [
  {
    question: "What would you use to unclog a toilet?",
    choice1: "A Plunger",
    choice2: "A Swiffer",
    choice3: "<A wrench",
    choice4: "A toilet Bar",
    answer: 1
  },
  {
    question:"Which of these things can disinfect a wound?",
    choice1: "Milk",
    choice2: "Smoke",
    choice3: "Vodka",
    choice4: "Pine Needles",
    answer: 3
  },
  {
    question: "Which of these things can you use to change a tire?",
    choice1: "Swivel Stick",
    choice2: "Pogo Board",
    choice3: "Axle Tie",
    choice4: "Jack",
    answer: 4
  },
  {
    question: "Around how long should you boil a hard-boiled egg?",
    choice1: "2 Minutes",
    choice2: "12 Minutes",
    choice3: "6 Minutes",
    choice4: "40 Minutes",
    answer: 2
  },
  {
    question: "What does CPR stand for?",
    choice1: " Cardiovascular Pressure Repetition",
    choice2: "Cardio Personnel Rescue",
    choice3: "Creative Pressure Relaxation",
    choice4: "Cardiopulmonary Resuscitation",
    answer: 4
  },
  {
    question: "A broken clock is still right____ a day",
    choice1: "Once",
    choice2: "Four Times",
    choice3: "Thrice",
    choice4: "Twice",
    answer: 4
  },
  {
    question: "What should you do before giving a toast?",
    choice1: "Say, what's up",
    choice2: "Bang your fist on the table",
    choice3: "Tap A fork On A class",
    choice4: "Start praying",
    answer: 3
  },
  {
    question: "What is one thing people do when they’re lying?",
    choice1: "They seem relaxed",
    choice2: "They smile",
    choice3: "They have a trouble keeping eye contact",
    choice4: "They never sit down",
    answer: 3
  },
  {
    question: "Which invention allows a person to look right through a wall?",
    choice1: "A Window",
    choice2: "UV Sensitive Camera",
    choice3: "Geothermal Ocular Lenses",
    choice4: "Granular Imaging Processor",
    answer: 1
  },
 {
    question: "What does the odometer measure?",
    choice1: " The RPM",
    choice2: "The smell of the car",
    choice3: "The Amount Of Distance A Car Has Traveled",
    choice4: "The Amount Of Friction On The Tires",
    answer: 2
  },
  {
    question: "Action needed before switching gears on a manual transmission car?",
    choice1: " Hit The Break",
    choice2: "Hit The Clutch",
    choice3: "Hit The Gas",
    choice4: "Tap The Brake",
    answer: 2
  },
  {
    question: "What does a barometer measure?",
    choice1: " Solar Activity",
    choice2: "Dew",
    choice3: "Humidity",
    choice4: "Atmospheric Pressure ",
    answer: 4
  },
  {
    question: "What do you need to jump start a car?",
    choice1: " Jumper Cables",
    choice2: "DVD",
    choice3: "USB Cable",
    choice4: "Transducer ",
    answer: 1
  },
  {
    question: "Where does solar energy come from?",
    choice1: " The Solaris Molecules",
    choice2: "The Sun",
    choice3: "Wind",
    choice4: "The Heat Of The Earth's Core ",
    answer: 2
  },
  {
    question: "WWhich of these is used to start a fire?",
    choice1: " Water",
    choice2: "Rice",
    choice3: "Flour",
    choice4: "Flint ",
    answer: 4
  },
  {
    question: "what five letter word becomes shorter when you add two letters?",
    choice1: " Short",
    choice2: "Negative Two",
    choice3: "Praxis",
    choice4: "Fate ",
    answer: 1
  },
  {
    question: "Exposure in photography refers to what?",
    choice1: " The Amount Of Light",
    choice2: "The Shutter Speed",
    choice3: "The White Balance",
    choice4: "The Contrast",
    answer: 1
  },
  {
    question: "What tool do you need to fix a leaky faucet?",
    choice1: " Pipe Sponge",
    choice2: "Tap Spool",
    choice3: "Wrench",
    choice4: "Plunger",
    answer: 3
  },
  {
    question: "What insects can chew through wood and destroy your home?",
    choice1: " Wood Beetles",
    choice2: "Ants",
    choice3: "Larvae",
    choice4: "Termites",
    answer: 4
  },
  {
    question: "What type of cheese is actually made backwards?",
    choice1: " Edam",
    choice2: "Mozzarella",
    choice3: "Gouda",
    choice4: "Cheddar",
    answer: 1
  }









  
  
];

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

startGame();