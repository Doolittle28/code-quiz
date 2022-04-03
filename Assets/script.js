var questions = [
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

var startButton = document.getElementById("start-quiz");
var questionCon = document.getElementById("quiz-con");
var timer = document.getElementById("timer");
var timeLeft = 60;
var currentQuestion = 0;
var feedback = document.getElementById('feedback');



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



function newQuestion() {
    var nextQuestion = document.createElement("p");
    nextQuestion.textContent = questions[currentQuestion].question;
    var answers = document.createElement('ol');

    if (questionCon === questions.length) {
        questionCon.innerHTML = "";
    }

    for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
        var choice = document.createElement('li');
        choice.textContent = questions[currentQuestion].choices[i];

        answers.append(choice);
    }
    questionCon.append(nextQuestion);
    questionCon.append(answers);

}

function correctAnswer(event) {
    var selection = event.target.textContent;
    console.log(selection);

    if (selection === questions[currentQuestion].answer) {
        var correctSelection = document.createElement('p');
        console.log(correctSelection);
        correctSelection.textContent = "Right you are young padawan!";
        feedback.append(correctSelection);
    }
    else {
        timeLeft -= 10;
    }
    feedback.innerHTML = "";
    questionCon.innerHTML = "";
    currentQuestion++;
    newQuestion();
}

function quizEnd() {
    if (currentQuestion > questions.length + 1)
        return;
}

questionCon.addEventListener('click', correctAnswer);
startButton.addEventListener('click', startGame);

