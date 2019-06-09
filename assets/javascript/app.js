let correctAnswer = 0;
let wrongAnswer = 0;
let unAnswered = 0;
let questionAnswered = false;
let timer = 30;
const btnArr = ["btn1", "btn2", "btn3", "btn4"];
const questionArr = [
  (q1 = {
    question: "What is the name of Arya's sword in Game of Thrones",
    answer: "Needle",
    wrongAnswer: "Ice",
    wrongAnswer2: "Longclaw",
    wrongAnswer3: "Oathkeeper",
  }),
  (q2 = {
    question: "Random Question",
    answer: "a",
    wrongAnswer: "b",
    wrongAnswer2: "c",
    wrongAnswer3: "d",
  }),
];

function shuffle(arr) {
  let random = arr.sort(() => Math.random() - 0.5);
  return random;
}

function writeDisplay(object) {
  document.getElementById("question").innerHTML = object.question;
  document.getElementById(btnArr[0]).innerHTML = object.answer;
  document.getElementById(btnArr[1]).innerHTML = object.wrongAnswer;
  document.getElementById(btnArr[2]).innerHTML = object.wrongAnswer2;
  document.getElementById(btnArr[3]).innerHTML = object.wrongAnswer3;
  document.getElementById("timer").innerHTML = timer;
}

function showStats() {}

function nextQuestion() {
  questionNumber = 0;
  if (questionNumber <= 5) {
    questionNumber++;
    writeDisplay(questionArr[questionNumber]);
  } else {
    showStats();
  }
}

function newGame() {
  shuffle(btnArr);
  shuffle(questionArr);
  writeDisplay(questionArr[0]);
  startTimer();
}

function compareAnswer(btn) {
  if (btn === btnArr[0]) {
    questionAnswered = true;
    correctAnswer++;
    console.log("Good Guess");
  } else {
    questionAnswered = true;
    wrongAnswer++;
    console.log("Wrong");
  }
}

document.getElementById("buttons").addEventListener("click", function(event) {
  let btnClicked = event.target.id;
  if (questionAnswered) {
    return;
  } else if (compareAnswer(btnClicked)) {
    console.log(button);
  }
});

function count() {
  if (questionAnswered || timer === 0) {
    unAnswered++;
    questionAnswered = true;
    stopTimer();
  } else {
    timer--;
    document.getElementById("timer").innerHTML = timer;
  }
}

function startTimer() {
  if (!questionAnswered) {
    const intervalId = setInterval(count, 1000);
  }
}

function stopTimer(intervalId) {
  clearInterval(intervalId);
}

newGame();
