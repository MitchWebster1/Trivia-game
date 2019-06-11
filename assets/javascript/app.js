let rightAnswer = 0;
let wrongAnswer = 0;
let unAnswered = 0;
let questionNumber = 0;
let questionAnswered = false;
let timer = 30;
let intervalId;
const btnArr = ["btn1", "btn2", "btn3", "btn4"];
let currentGame = []
// Holds all of the questions, answers and pictures associated with each question
const questionArr = [
  (q1 = {
    question: "What is the name of Arya's sword in Game of Thrones?",
    answer: "Needle",
    wrongAnswer: "Ice",
    wrongAnswer2: "Longclaw",
    wrongAnswer3: "Oathkeeper",
    picture: "assets/images/needle1.jpg"
  }),
  (q2 = {
    question: "What is the name of Jon Snow's Direwolf?",
    answer: "Ghost",
    wrongAnswer: "Nymeria",
    wrongAnswer2: "Summer",
    wrongAnswer3: "Lady",
    picture: "assets/images/ghost1.jpg"
  }),
  (q3 = {
    question: "What are the words of House Stark?",
    answer: "Winter Is Coming",
    wrongAnswer: "Hear Me Roar",
    wrongAnswer2: "Growing Strong",
    wrongAnswer3: "Unbowed, Unbent, Unbroken",
    picture: "assets/images/stark1.jpg"
  }),
  (q4 = {
    question: "Who is known as the Kingslayer?",
    answer: "Jaime Lannister",
    wrongAnswer: "Arya Stark",
    wrongAnswer2: "Robert Baratheon",
    wrongAnswer3: "Daenerys Targaryen",
    picture: "assets/images/jaimeLannister1.jpg"
  }),
  (q5 = {
    question: "Which of these is not one of Daenerys dragons?",
    answer: "Smaug",
    wrongAnswer: "Drogon",
    wrongAnswer2: "Rhaegal",
    wrongAnswer3: "Viserion",
    picture: "assets/images/smaug1.jpg"
  }),
  (q6 = {
    question: "Who was responsible for the creation of the Night King?",
    answer: "The Children of the Forest",
    wrongAnswer: "The Lord of Light",
    wrongAnswer2: "The Drowned God",
    wrongAnswer3: "The First Men",
    picture: "assets/images/nightKing1.jpg"
  }),
  (q7 = {
    question: "This character is also known for being the world's strongest man. ",
    answer: "The Mountain",
    wrongAnswer: "The Hound",
    wrongAnswer2: "Khal Drogo",
    wrongAnswer3: "Tormund Giantsbane",
    picture: "assets/images/theMountain1.jpg"
  }),
  (q8 = {
    question: "Whose family crest is that of a Stag?",
    answer: "Baratheon",
    wrongAnswer: "Stark",
    wrongAnswer2: "Bolton",
    wrongAnswer3: "Lannister",
    picture: "assets/images/stag1.jpg"
  }),
];

// Is used to shuffle the button array as well as the question array so
// they are randomized with each new question / game respectively
function shuffle(arr) {
  let random = arr.sort(() => Math.random() - 0.5);
  return random;
}

// Resets game to starting values
function resetValues() {
  rightAnswer = 0;
  wrongAnswer = 0;
  unAnswered = 0;
  questionNumber = 0;
  questionAnswered = false;
}

// Fills in the question and possible answers with each new question
function writeDisplay(object) {
  document.getElementById("question").innerHTML = object.question;
  document.getElementById(btnArr[0]).innerHTML = object.answer;
  document.getElementById(btnArr[1]).innerHTML = object.wrongAnswer;
  document.getElementById(btnArr[2]).innerHTML = object.wrongAnswer2;
  document.getElementById(btnArr[3]).innerHTML = object.wrongAnswer3;
}

// Writes to the html to display how you did at the end of the game
function showStats() {
  document.getElementById("timer").innerHTML = "Game Over";
  document.getElementById("question").innerHTML = "Here's how you did!";
  document.getElementById("btn1").innerHTML = "Correct Answers " + rightAnswer;
  document.getElementById("btn2").innerHTML = "Wrong Answers " + wrongAnswer;
  document.getElementById("btn3").innerHTML =
    "Questions Unanswered " + unAnswered;
  document.getElementById("btn4").innerHTML = "New Game";
  document.getElementById("btn4").id = "newGame";
}

function nextQuestion() {
  if (questionNumber <= 5) {
    shuffle(btnArr);
    questionAnswered = false;
    writeDisplay(questionArr[questionNumber]);
    startTimer();
  } else {
    stopTimer();
    showStats();
  }
}

function newGame() {
  document.getElementById("newGame").id = "btn4";
  currentGame = (shuffle(questionArr));
  shuffle(btnArr);
  writeDisplay(currentGame[0]);
  resetValues();
  console.log(currentGame)
  setTimeout(startTimer, 1000);
}

// Sets the source for the image to be displayed and shows the image div on top
function showImage(src) {
  document.getElementById("image").innerHTML = "<img src=" + src + "/>"
  document.getElementById("image").style.display = "block"
  timeOut(hideImage)
}

// Hides the image div after the timeout
function hideImage() {
  document.getElementById("image").style.display = "none"
}

// Is triggered from the compare answer function if answer is correct
function correctAnswer(object) {
  showImage(currentGame[questionNumber].picture)
  questionAnswered = true;
  rightAnswer++;
  questionNumber++;
  document.getElementById("timer").innerHTML = "Correct!";
  stopTimer();
  timeOut(nextQuestion);
}

// Is triggered from the compare answer function if answer is incorrect
function incorrectAnswer(object) {
  showImage(currentGame[questionNumber].picture);
  questionAnswered = true;
  wrongAnswer++;
  questionNumber++;
  document.getElementById("timer").innerHTML = "Incorrect!";
  document.getElementById("question").innerHTML =
    "The correct answer is " + object.answer;
  stopTimer();
  timeOut(nextQuestion);
}

// Is triggered from the count function when the timer hits 0
function noAnswer() {
  showImage("assets/images/dontKnow.jpg")
  questionNumber++;
  unAnswered++;
  questionAnswered = true;
  document.getElementById("timer").innerHTML = "Time's Up!";
  document.getElementById("question").innerHTML =
    "The correct answer is " + object.answer;
  stopTimer();
  timeOut(nextQuestion);
}

// Compares button selected vs which one held the correct answer
function compareAnswer(btn) {
  if (btn === btnArr[0]) {
    correctAnswer(currentGame[questionNumber]);
  } else {
    incorrectAnswer(currentGame[questionNumber]);
  }
}

// all of my button click events
document.getElementById("buttons").addEventListener("click", function(event) {
  let btnClicked = event.target.id;
  if (btnClicked === "newGame") {
    newGame();
  } else if (questionAnswered) {
    return;
  } else if (compareAnswer(btnClicked)) {
    stopTimer();
  }
});

// Checks to see if question has been answer or if timer is at 0 if not counts down
function count() {
  if (questionAnswered || timer === 0) {
    noAnswer();
  } else {
    timer--;
    document.getElementById("timer").innerHTML =
      "Time remaining: " + timer + " seconds";
  }
}

// Starts the timer for each new question
function startTimer() {
  if (!questionAnswered) {
    timer = 30;
    document.getElementById("timer").innerHTML =
      "Time remaining: " + timer + " seconds";
    intervalId = setInterval(count, 1000);
  }
}

// Stops the timer and clears out the interval
function stopTimer() {
  clearInterval(intervalId);
}

// Sets the timeout between questions and how long the image is displayed
function timeOut(fnc) {
  setTimeout(fnc, 5000);
}

newGame();
