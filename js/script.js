let score = 0;
let questionTimer = 24;
let nextQuestionTimer = 5;
let currentQuestion = 0;
let totalQuestions = 10;
let countDownInterval;

const questions = [
    {
        question: 'Who holds the record for the most career points in NBA history?',
        answers: [
            {text: 'Michael Jordan', correct: false},
            {text: 'Kareem Abdul-Jabbar', correct: false},
            {text: 'LeBron James', correct: true},
            {text: 'Kobe Bryant', correct: false}
        ]
    },

    {
        question: 'Which team won the very first NBA Championship in 1947 (then called the BAA)?',
        answers: [
            {text: 'New York Knicks', correct: false},
            {text: 'Chicago Stags', correct: false},
            {text: 'Philadelphia Warriors', correct: true},
            {text: 'Boston Celtics', correct: false}
        ]
    },
    {
        question: 'How many players from each team are on the court during standard play?',
        answers: [
            {text: '4', correct: false},
            {text: '5', correct: true},
            {text: '6', correct: false},
            {text: '7', correct: false}
        ]
    },
    {
        question: 'Which NBA player is famously known as “The Greek Freak”?',
        answers: [
            {text: 'Luka Dončić', correct: false},
            {text: 'Nikola Jokić', correct: false},
            {text: 'Giannis Antetokounmpo', correct: true},
            {text: 'Kristaps Porziņģis', correct: false}
        ]
    },
    {
        question: 'Which team won the 2024 NBA Championship?',
        answers: [
            {text: 'Boston Celtics', correct: true},
            {text: 'Denver Nuggets', correct: false},
            {text: 'Miami Heat', correct: false},
            {text: 'Los Angeles Lakers', correct: false}
        ]
    },
    {
        question: 'What is the regulation height of an NBA basketball hoop?',
        answers: [
            {text: '9 feet', correct: false},
            {text: '10 feet', correct: true},
            {text: '11 feet', correct: false},
            {text: '12 feet', correct: false}
        ]
    },
    {
        question: 'Who was the first player to be unanimously voted NBA MVP?',
        answers: [
            {text: 'LeBron James', correct: false},
            {text: 'Stephen Curry', correct: true},
            {text: 'Kevin Durant', correct: false},
            {text: 'Shaquille O’Neal', correct: false}
        ]
    },
    {
        question: 'Which franchise has won the most NBA championships (as of 2025)?',
        answers: [
            {text: 'Los Angeles Lakers', correct: false},
            {text: 'Boston Celtics', correct: true},
            {text: 'Chicago Bulls', correct: false},
            {text: 'Golden State Warriors', correct: false}
        ]
    },
    {
        question: 'What year was the NBA founded?',
        answers: [
            {text: '1946', correct: true},
            {text: '1950', correct: false},
            {text: '1965', correct: false},
            {text: '1972', correct: false}
        ]
    },
    {
        question: 'Which player earned the nickname “Black Mamba”?',
        answers: [
            {text: 'Michael Jordan', correct: false},
            {text: 'Allen Iverson', correct: false},
            {text: 'Kobe Bryant', correct: true},
            {text: 'Tracy McGrady', correct: false}
        ]
    }
];

function startQuiz() {
let splashScreen = document.querySelector('.splash-screen');
let quizScreen = document.querySelector('.quiz-screen');
let startQuizBtn = document.querySelector('.primary-cta');

startQuizBtn.addEventListener('click', () => {
if(splashScreen && quizScreen) {
    splashScreen.classList.add('is-hidden');
    quizScreen.classList.add('is-shown');
    let nextBtn = document.querySelector('.next-btn');
    nextBtn.disabled = true;
    nextBtn.classList.add('is-disabled');
    score = 0;
    questionTimer = 24;
    nextQuestionTimer = 5;
    currentQuestion = 0;  
  shuffledQuestions = shuffleQuestions(questions);
  shuffledQuestions.forEach(question => {
    shuffleQuestionAnswers(question.answers);
  });
  displayQuestion();
  quizTimer();
}
});
}
startQuiz();

function displayQuestion () {
let quizCard = document.querySelector('.quiz-card');

const currentQuestionAnswers = questions[currentQuestion].answers;

const answerChoices = currentQuestionAnswers.map(choices => {
return `
            <li class="multiple-choice-list-item">
            <button class="option-btn" data-answer="${choices.text}" data-correct="${choices.correct}">${choices.text}</button>
            </li>
`;
}).join('');

quizCard.innerHTML = `
<header class="quiz-controls">
            <span class="question-counter">${currentQuestion + 1}Q</span
            ><span class="question-timer">${questionTimer}</span>
          </header>
          <h2 class="question">${questions[currentQuestion].question}</h2>
          <ul class="multiple-choice">
            
            ${answerChoices}
            
          </ul>
          <button class="next-btn">Next Question</button>
`;
    let nextBtn = document.querySelector('.next-btn');
    nextBtn.disabled = true;
    nextBtn.classList.add('is-disabled');
    let answerOptions = document.querySelectorAll('.option-btn');

    answerOptions.forEach(option => {
        option.addEventListener('click', handleClickedChoice);
    });
    nextQuestionButton();
}

function handleClickedChoice(e) {
if(!e) {
return;
}
const clickedAnswer = e.target;
const isCorrect = clickedAnswer.dataset.correct === "true";
let timerQuiz = document.querySelector('.question-timer');
clearInterval(countDownInterval);
if(isCorrect) {
    clickedAnswer.classList.add('is-correct');
    score++;

}else {
    clickedAnswer.classList.add('is-wrong');
    let correctAnswer = document.querySelector('.option-btn[data-correct="true"]');
    if(correctAnswer) {
        correctAnswer.classList.add('is-correct-fallback');
    }
}
timerQuiz.style.display = 'none';
document.querySelectorAll('.option-btn').forEach(answerChoice => {
    answerChoice.disabled = true;
    answerChoice.classList.add('un-selected-choices-is-disabled');
});

let nextBtn = document.querySelector('.next-btn');
nextBtn.disabled = false;
nextBtn.classList.remove('is-disabled');
}

function displayNextQuestion(){
    currentQuestion++;
    
    if(currentQuestion < questions.length) {
        displayQuestion();
        quizTimer();
         questionTimer = 24;
    }else {
        showResults();
    }
}

function nextQuestionButton() {
    let nextBtn = document.querySelector('.next-btn');

nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    displayNextQuestion();
})
}


function showResults() {
    let quizScreen = document.querySelector('.quiz-screen');
    let resultScreen = document.querySelector('.result-screen');
    let percentageScore = (score / totalQuestions) * 100;
let percentage = document.querySelector('.percent');
let resultMessage = document.querySelector('.result-message');
let passingScore = 'You\'re an All-Star!'
let mediumScore = 'You made the starting lineup.'
let failedScore = ' You\'re a bench warmer.'
    quizScreen.classList.remove('is-shown');
    resultScreen.classList.add('is-shown');

    if(percentageScore >= 80) {
        percentage.textContent = percentageScore  + '%';
        resultMessage.textContent = passingScore;
    }else if(percentageScore <= 30) {
        percentage.textContent = percentageScore + '%';
        resultMessage.textContent = failedScore;
    }else if(percentageScore <= 50) {
        percentage.textContent = percentageScore + '%';
        resultMessage.textContent = mediumScore;
    }
}

function shuffleQuestions(array) {
let currentIndex = array.length;
let randomIndex;

while(currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
}

return array;
}
let shuffledQuestions = shuffleQuestions(questions);

function shuffleQuestionAnswers(array) {
    let currentIndex = array.length;
    let randomIndex;

    while(currentIndex !==0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}



function quizTimer() {
const timerDisplay = document.querySelector('.question-timer');

countDownInterval = setInterval(() => {
    questionTimer--;
    timerDisplay.textContent = questionTimer;

    if(questionTimer <= 0) {
        clearInterval(countDownInterval);
        timerDisplay.textContent = '00';
        timerSound();
        questionTimerExpires();
        handleClickedChoice();

        setTimeout(() => {
            displayNextQuestion();

        }, 5000);
    }
}, 1000);
}

function timerSound() {
    let buzzerSound = new Audio('./Sound/buzzer.mp3');
    buzzerSound.play();
}


function questionTimerExpires() {
let nextBtn = document.querySelector('.next-btn');
let correctAnswer = document.querySelector('.option-btn[data-correct="true"]');
nextBtn.disabled = true;
nextBtn.classList.add('is-disabled');
correctAnswer.classList.add('is-correct-fallback');
document.querySelectorAll('.option-btn').forEach(answerChoice => {
    answerChoice.disabled = true;
    answerChoice.classList.add('un-selected-choices-is-disabled');
});
}

function instructionModal() {
let instructionBtn = document.querySelector('.secondary-cta');
let modal = document.createElement('dialog');
let header = document.createElement('header');
let headerTwo = document.createElement('h2');
let ul = document.createElement('ul');
let button = document.createElement('button');

const instructions = [
'You have exactly 24 seconds to answer each question from the moment it is presented/read.',
        'If the 24 seconds are up, that question will be marked wrong.',
        'You must answer the question before moving to the next one (no skipping).',
        'All questions are multiple-choice, with one correct answer.',
        'Each correct answer earns 1 point; there is no penalty for an incorrect guess.',
        'At the end of the quiz your score will be given'
];

instructionBtn.addEventListener('click', (e) => {
    e.preventDefault();
if(modal) {
    document.body.appendChild(modal);
    modal.appendChild(header);
    header.appendChild(headerTwo);
    modal.appendChild(ul);
    modal.appendChild(button);

    let instructionTitle = 'Instruction';
    headerTwo.textContent = instructionTitle;

    for(let i = 0; i < instructions.length; i++) {
        let li = document.createElement('li');
        li.textContent = instructions[i];
        ul.appendChild(li);
    }

    let closeModal = 'Got it';
    button.textContent = closeModal;
    modal.showModal();
}
});

button.addEventListener('click', () => {
    modal.close();
    modal.remove();
});
}
instructionModal();