const questions = [
  {
    question: "What is  2 + 2 ?",
    answers: [
      {
        text: "4",
        correct: true,
      },
      {
        text: "12",
        correct: false,
      },
      {
        text: "22",
        correct: false,
      },
      {
        text: "2",
        correct: false,
      },
    ],
  },
  {
    question: " Can you use MathML tags directly in HTML5 without any plugin?",
    answers: [
      {
        text: true,
        correct: true,
      },
      {
        text: "false",
        correct: false,
      },
     
    ],
  },
  {
    question: "JavaScript is used for ?",
    answers: [
      {
        text: "",
        correct: false,
      },
      {
        text: "front and backend",
        correct: false,
      },
      {
        text: "to create web content",
        correct: false,
      },
      {
        text: "to create dynamic and interactive web content ",
        correct: true,
      },
    ],
  },
  {
    question: "What is  HTML ?",
    answers: [
      {
        text: "Markup Language",
        correct: false,
      },
      {
        text: "Hyper Text Markup Language",
        correct: true,
      },
      {
        text: "Hyper Text Machine Language",
        correct: false,
      },
      {
        text: "html",
        correct: false,
      },
    ],
  },
  {
    question: "Which of the following browser supports HTML5 in its latest version?",
    answers: [
      {
        text: "Apple Safari",
        correct: false,
      },
      {
        text: "Google Chrome",
        correct: false,
      },
      {
        text: "Both of the above.",
        correct: true,
      },
      {
        text: " None of the above.",
        correct: false,
      },
    ],
  },
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer_Btn");
const nextButton = document.getElementById("next_btn");

let currentQuestionIndex = 0;
let score=0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0
  nextButton.innerHTML= "Next";
  showQuestions();
}


function showQuestions(){
  resetState();
  let currentQuestions = questions[currentQuestionIndex];
  let questionNumber= currentQuestionIndex + 1;
  document.getElementById("questionNumber").innerHTML = "Question:"+ " " +questionNumber;
  questionElement.innerHTML = currentQuestions.question;


  currentQuestions.answers.forEach(answer =>{
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });

}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }
  else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button =>{
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true ;
  })
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `Your score $(score) out of $(questions.length)!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestions();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
})
startQuiz();