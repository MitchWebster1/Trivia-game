let correctAnswer = 0;
let wrongAnswer = 0;

function shuffle(arr) {
  let random = arr.sort(() => Math.random() - 0.5);
  return random;
}

const question1 = {
  question: "What is the name of Arya's sword in Game of Thrones",
  answer: "Needle",
  wrongAnswer: "Ice",
  wrongAnswer2: "Longclaw",
  wrongAnswer3: "Oathkeeper",
};

const question2 = {
  question: "Random Question",
  answer: "a",
  wrongAnswer: "b",
  wrongAnswer2: "c",
  wrongAnswer3: "d",
};

const btnArr = ["btn1", "btn2", "btn3", "btn4"];
const questionArr = [question1, question2];

function writeDisplay(object) {
  document.getElementById("question").innerHTML = object.question;
  document.getElementById(btnArr[0]).innerHTML = object.answer;
  document.getElementById(btnArr[1]).innerHTML = object.wrongAnswer;
  document.getElementById(btnArr[2]).innerHTML = object.wrongAnswer2;
  document.getElementById(btnArr[3]).innerHTML = object.wrongAnswer3;
}

function newGame() {
  shuffle(btnArr);
  shuffle(questionArr);
  writeDisplay(questionArr[0]);
}

function compareAnswer(btn) {
  if (btn == btnArr[0]) {
    correctAnswer++;
    console.log("Good Guess");
  } else {
    console.log("Wrong");
  }
}

document.addEventListener("click", function(event) {
  let button = "";
  if (event.target.matches(".btn")) {
    button = event.target;
    console.log(button);
    // compareAnswer(button);
  }
});

// console.log(newGame());
