let rightAnswer = 0;
let wrongAnswer = 0;
let unAnswered = 0;
let questionNumber = 0;
let questionAnswered = false;
let timer = 30;
let intervalId;
const btnArr = ["btn1", "btn2", "btn3", "btn4"];
let currentGame = [];
// Holds all of the questions, answers and pictures associated with each question
const questionArr = [
  (q1 = {
    question: "What is the name of Arya's sword in Game of Thrones?",
    answer: "Needle",
    wrongAnswer: "Ice",
    wrongAnswer2: "Longclaw",
    wrongAnswer3: "Oathkeeper",
    picture: "assets/images/needle1.jpg",
    fact: "Jon gifted Needle to Arya when he left for the Night's Watch",
  }),
  (q2 = {
    question: "What is the name of Jon Snow's Direwolf?",
    answer: "Ghost",
    wrongAnswer: "Nymeria",
    wrongAnswer2: "Summer",
    wrongAnswer3: "Lady",
    picture: "assets/images/ghost1.jpg",
    fact: "Jon's direwolf Ghost is known for his all white appearance",
  }),
  (q3 = {
    question: "What are the words of House Stark?",
    answer: "Winter Is Coming",
    wrongAnswer: "Hear Me Roar",
    wrongAnswer2: "Growing Strong",
    wrongAnswer3: "Unbowed, Unbent, Unbroken",
    picture: "assets/images/stark1.jpg",
    fact: "The Stark's were warning of the coming winter even before the Night King was known",
  }),
  (q4 = {
    question: "Which character is known as the Kingslayer?",
    answer: "Jaime Lannister",
    wrongAnswer: "Arya Stark",
    wrongAnswer2: "Robert Baratheon",
    wrongAnswer3: "Daenerys Targaryen",
    picture: "assets/images/jaimeLannister1.jpg",
    fact:
      "Jaime killed the king he was supposed to be protecting and was thereafter called the Kingslayer",
  }),
  (q5 = {
    question: "Which of these is not one of Daenerys dragons?",
    answer: "Smaug",
    wrongAnswer: "Drogon",
    wrongAnswer2: "Rhaegal",
    wrongAnswer3: "Viserion",
    picture: ".assets/images/smaug1.jpg",
    fact: "Smaug is the dragon found in the hobbit series sleeping on his mountain of gold.",
  }),
  (q6 = {
    question: "The children of the forest created: ",
    answer: "The Night King",
    wrongAnswer: "The Lord of Light",
    wrongAnswer2: "The Dragons",
    wrongAnswer3: "The First Men",
    picture: "/assets/images/nightKing1.jpg",
    fact:
      "The children of the forest created the White Walkers to protect themselves against the First Men.",
  }),
  (q7 = {
    question: "This character is also known for being the world's strongest man. ",
    answer: "The Mountain",
    wrongAnswer: "The Hound",
    wrongAnswer2: "Khal Drogo",
    wrongAnswer3: "Tormund Giantsbane",
    picture: "assets/images/theMountain1.jpg",
    fact: "He is apptly named The Mountain coming in at 6' 9 and weighing 420lbs",
  }),
  (q8 = {
    question: "Whose family crest is that of a Stag?",
    answer: "Baratheon",
    wrongAnswer: "Stark",
    wrongAnswer2: "Bolton",
    wrongAnswer3: "Lannister",
    picture: "assets/images/stag1.jpg",
    fact: "The sigil of King Robert",
  }),
];

// Is used to shuffle the button array as well as the question array so
// they are randomized with each new question / game respectively
function shuffle(arr) {
  const random = arr.sort(() => Math.random() - 0.5);
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
  document.getElementById("btn1").innerHTML = `Correct Answers: ${rightAnswer}`;
  document.getElementById("btn2").innerHTML = `Wrong Answers: ${wrongAnswer}`;
  document.getElementById("btn3").innerHTML = `Questions Unanswered: ${unAnswered}`;
  document.getElementById("btn4").innerHTML = "New Game";
  document.getElementById("btn4").id = "newGame";
}

// If under question number limit puts new question on screen / else ends game and shows stats
function nextQuestion() {
  if (questionNumber <= 4) {
    shuffle(btnArr);
    questionAnswered = false;
    writeDisplay(questionArr[questionNumber]);
    startTimer();
  } else {
    stopTimer();
    showStats();
  }
}

// Shuffles question array and puts that value into current game then starts the game
function newGame() {
  document.getElementById("newGame").id = "btn4";
  currentGame = shuffle(questionArr);
  shuffle(btnArr);
  writeDisplay(currentGame[0]);
  resetValues();
  console.log(currentGame);
  setTimeout(startTimer, 1000);
}

// Sets the source for the image to be displayed / hides the buttons / displays image
function showImage(src) {
  document.getElementById("image").innerHTML = `<img src=${src}>`;
  document.getElementById("image").style.display = "block";
  document.getElementById("buttons").style.display = "none";
  timeOut(hideImage);
}

// Hides the image div after the timeout and shows the buttons
function hideImage() {
  document.getElementById("image").style.display = "none";
  document.getElementById("buttons").style.display = "flex";
}

// Is triggered from the compare answer function if answer is correct
function correctAnswer(object) {
  showImage(currentGame[questionNumber].picture);
  questionAnswered = true;
  rightAnswer++;
  questionNumber++;
  document.getElementById("timer").innerHTML = "Correct!";
  document.getElementById("question").innerHTML = object.fact;
  stopTimer();
  timeOut(nextQuestion);
}

// Is triggered from the compare answer function if answer is incorrect
function incorrectAnswer(object) {
  showImage(currentGame[questionNumber].picture);
  questionAnswered = true;
  wrongAnswer++;
  questionNumber++;
  document.getElementById("timer").innerHTML = `${"Incorrect! " + "The correct answer is "}${object.answer}`;
  document.getElementById("question").innerHTML = object.fact;
  stopTimer();
  timeOut(nextQuestion);
}

// Is triggered from the count function when the timer hits 0
function noAnswer(object) {
  showImage("assets/images/dontKnow1.jpg");
  questionNumber++;
  unAnswered++;
  questionAnswered = true;
  document.getElementById("timer").innerHTML = `${"Time's Up! " + " The correct answer is "}${object.answer}`;
  document.getElementById("question").innerHTML = object.fact;
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
document.getElementById("buttons").addEventListener("click", (event) => {
  const btnClicked = event.target.id;
  if (btnClicked === "newGame") {
    newGame();
  } else if (questionAnswered) {

  } else if (compareAnswer(btnClicked)) {
    stopTimer();
  }
});

// Checks to see if question has been answer or if timer is at 0 if not counts down
function count() {
  if (questionAnswered || timer === 0) {
    noAnswer(currentGame[questionNumber]);
  } else {
    timer--;
    document.getElementById("timer").innerHTML = `Time remaining: ${timer} seconds`;
  }
}

// Starts the timer for each new question
function startTimer() {
  if (!questionAnswered) {
    timer = 30;
    document.getElementById("timer").innerHTML = `Time remaining: ${timer} seconds`;
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
