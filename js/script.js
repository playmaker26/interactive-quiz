let seconds = 24;
let correctAnswer = 0;
let currentQuestion = 0;

const questions = [
    {
    question: "Who holds the record for the most career points in NBA history?",
    answers: [   
    {text: 'Michael Jordan', correct: false},
    {text: 'Michael Jordan', correct: false},
    {text: 'LeBron James', correct: true},
    {text: 'Kobe Bryant', correct: false}
]

    },

        {
    question: "Which team won the very first NBA Championship in 1947 (then called the BAA)?",
    answers: [   
    {text: 'New York Knicks', correct: false},
    {text: 'Chicago Stags', correct: false},
    {text: 'Philadelphia Warriors', correct: true},
    {text: 'Boston Celtics', correct: false}
]

    },

            {
    question: "How many players from each team are on the court during standard play?",
    answers: [   
    {text: '4', correct: false},
    {text: '5', correct: true},
    {text: '6', correct: false},
    {text: '7', correct: false}
]

    },

                {
    question: "Which NBA player is famously known as “The Greek Freak”?",
    answers: [   
    {text: 'Luka Dončić', correct: false},
    {text: 'Nikola Jokić', correct: false},
    {text: 'Giannis Antetokounmpo', correct: true},
    {text: 'Kristaps Porziņģis', correct: false}
]

    },

                    {
    question: "Which team won the 2024 NBA Championship?",
    answers: [   
    {text: 'Boston Celtics', correct: true},
    {text: 'Denver Nuggets', correct: false},
    {text: 'Miami Heat', correct: false},
    {text: 'Los Angeles Lakers', correct: false}
]

    },

                        {
    question: "What is the regulation height of an NBA basketball hoop?",
    answers: [   
    {text: '9 feet', correct: false},
    {text: '10 feet', correct: true},
    {text: '11 feet', correct: false},
    {text: '12 feet', correct: false}
]

    },

                            {
    question: "Who was the first player to be unanimously voted NBA MVP?",
    answers: [   
    {text: 'LeBron James', correct: false},
    {text: 'Stephen Curry', correct: true},
    {text: 'Kevin Durant', correct: false},
    {text: 'Shaquille O’Neal', correct: false}
]

    },

                                {
    question: "Which franchise has won the most NBA championships (as of 2025)?",
    answers: [   
    {text: 'Los Angeles Lakers', correct: false},
    {text: 'Boston Celtics', correct: true},
    {text: 'Chicago Bulls', correct: false},
    {text: 'Golden State Warriors', correct: false}
]

    },

                                    {
    question: "What year was the NBA founded?",
    answers: [   
    {text: '1946', correct: true},
    {text: '1950', correct: false},
    {text: '1965', correct: false},
    {text: '1972', correct: false}
]

    },

                                        {
    question: "Which player earned the nickname “Black Mamba”?",
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
    let resultScreen = document.querySelector('.result-screen');
    let quizBtn = document.querySelector('.splash-screen__primary-cta');

    quizBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if(splashScreen) {
            splashScreen.style.display = 'none';
             resultScreen.style.display = 'none';
        quizScreen.style.display = 'flex';
        currentQuestion = 0;
        correctAnswer = 0;
        seconds = 24;

        quizScreen.innerHTML = `
        <form id='questionCard'>
        <header class="quiz-screen__controls">
        <span class="quiz-screen__number-question">${currentQuestion + 1}Q</span>
        <span class="quiz-screen__question-timer">${seconds}</span>
        </header>
         <p class="quiz-screen__question">${questions[currentQuestion].question}</p>
        <ul class="quiz-screen__list">
        <li class="quiz-screen__list-item"><button class="quiz-screen__possible-answers"></button></li>
        </ul>
        <button class="quiz-screen__next-btn">Next Question</button>
        </form>
        `;
        }
    });
}
startQuiz();

function displayQuestions() {

}


function modalToggle() {
let instructionBtn = document.querySelector('.splash-screen__secondary-cta');

instructionBtn.addEventListener('click', (e) => {
e.preventDefault();
let modal = document.createElement('dialog');
modal.classList.add('modal-screen');
if(modal) {
    modal.innerHTML = `
    <header class="modal-screen__header">
    <h2 class="modal-screen__title">Instruction</h2>
    </header>

    <ul class="modal-screen__list">
    <li class="modal-screen__list-item">You have exactly 24 seconds to answer each question from the moment it is presented/read.</li>
    <li class="modal-screen__list-item">If the 24 seconds are up, that question will be marked wrong.</li>
    <li class="modal-screen__list-item">You must answer the question before moving to the next one (no skipping).</li>
    <li class="modal-screen__list-item">All questions are multiple-choice, with one correct answer.</li>
    <li class="modal-screen__list-item">Each correct answer earns 1 point; there is no penalty for an incorrect guess.</li>
    <li class="modal-screen__list-item">At the end of the quiz your score will be given</li>
    </ul>
    <button class="modal-screen__close-btn">Got it</button>
    `;
     
    document.body.appendChild(modal);
    modal.showModal();
}
let closeModal = document.querySelector('.modal-screen__close-btn');
closeModal.addEventListener('click', () => {
modal.close();
modal.remove();
});
});
}
modalToggle();