var questions = [ //array of objects for questions and answers 
    {
        question: "___ is used to define a variable.",
        choices: ["const", "var", "let", "all of the above"],
        answer: "all of the above",
    },
    {
        question: "What tag do you use to link to a JavaScript file?",
        choices: ["javascript", "script", "js", "src"],
        answer: "script",
    },
    {
        question: "_ is the first index of an array.",
        choices: ["1", "3", "6", "0"],
        answer: "0",
    },
    {
        question: "What is the 'success' color used in bootstrap?",
        choices: ["red", "grey", "blue", "green"],
        answer: "green",
    }
];

//variables to be used 
var startButton = document.getElementById("start-quiz");
var questionCon = document.getElementById("quiz-con");
var timer = document.getElementById("timer");
var timeLeft = 60;
var currentQuestion = 0;
var feedback = document.getElementById('feedback');

//function to start quiz and timer
function startGame() {
    newQuestion();

    clearInterval(timer);
    timeLeft = 60
    document.getElementById('timer').innerHTML = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            quizEnd();
        }
    },
        1000);
}

//function to generate a new question at game start and after each question is answered
function newQuestion() {
    var nextQuestion = document.createElement("p");
    nextQuestion.textContent = questions[currentQuestion].question;
    var answers = document.createElement('ol');

    if (questionCon === questions.length || timeLeft === 0) { //if there are no more questions or the timer gets to 0, the quiz ends
        quizEnd();
    }

    for (var i = 0; i < questions[currentQuestion].choices.length; i++) { //for loop to generate new question based on index in questions array
        var choice = document.createElement('li');
        choice.textContent = questions[currentQuestion].choices[i];

        answers.append(choice);
    }
    questionCon.append(nextQuestion);
    questionCon.append(answers);
}

//function to check if answer is right
function correctAnswer(event) {
    var selection = event.target.textContent;
    console.log(selection);

    if (selection === questions[currentQuestion].answer) { //if statement to check if answer was right
        var correctSelection = document.createElement('p');
        console.log(correctSelection);
        score += 5; //if answer is right, add 5 to score
    }
    else {
        timeLeft -= 10; //if answer is wrong, take away 10 seconds
    }
    console.log(score); //check if score is adding correcting after right answers 
    questionCon.innerHTML = ""; //clearing question container to bring up new question
    currentQuestion++; //adds 1 to index and brings up next question in array
    newQuestion();
}

function quizEnd() { //ends quiz and clears container 
    questionCon.innerHTML = "";
}

var viewScore = document.getElementById('view-score');
var addScore = document.getElementById('add-score');
var player = document.getElementById('user');
var score = 0;

//fuction that sets score and user in local storage
function newScore() {
    localStorage.setItem('view-score', score);
    localStorage.setItem('user', document.getElementById('user').value);
};

//fuction that pulls score and user from local storage
function viewScores() {
    var playerScore = localStorage.getItem('view-score', score);
    var player = localStorage.getItem('user', document.getElementById('user').value);
    window.alert(` ${player} : ${playerScore}`); //alerts user with score when view score button is clicked
};

questionCon.addEventListener('click', correctAnswer);
startButton.addEventListener('click', startGame);
viewScore.addEventListener('click', viewScores);
addScore.addEventListener('click', newScore);