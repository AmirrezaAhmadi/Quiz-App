const questions = [
    {
        question: "What is the capital city of Iran?",
        choices: ["Tehran", "Isfahan", "Shiraz", "Tabriz"],
        answer: 0
    },
    {
        question: "Which city in Iran does the Karun River pass through?",
        choices: ["Mashhad", "Ahvaz", "Tabriz", "Rasht"],
        answer: 1
    },
    {
        question: "Which famous Iranian poet has a mausoleum in Shiraz?",
        choices: ["Hafez", "Rumi", "Ferdowsi", "Saadi"],
        answer: 0
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const nextButton = document.getElementById('next-btn');
const progressBar = document.getElementById('progress');
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');
const quizContainer = document.getElementById('quiz');
const restartButton = document.getElementById('restart-btn');

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
    updateProgressBar();
}

function showQuestion() {
    const questionData = questions[currentQuestion];
    questionElement.textContent = questionData.question;
    choicesElement.innerHTML = '';

    questionData.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.classList.add('choice');
        button.textContent = choice;
        button.setAttribute('data-number', index);
        button.addEventListener('click', selectAnswer);
        choicesElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedChoice = e.target;
    const selectedAnswer = parseInt(selectedChoice.getAttribute('data-number'));

    if (selectedChoice.classList.contains('selected')) {
        selectedChoice.classList.remove('selected');
        nextButton.style.display = 'none';
        return;
    }

    const allChoices = document.querySelectorAll('.choice');
    allChoices.forEach(choice => choice.classList.remove('selected'));

    selectedChoice.classList.add('selected');

    if (selectedAnswer === questions[currentQuestion].answer) {
        score++;
    }

    nextButton.style.display = 'block';
}

function updateProgressBar() {
    const progressPerQuestion = 100 / questions.length;

    const progress = (currentQuestion * progressPerQuestion);

    progressBar.style.width = `${progress}%`;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
        updateProgressBar();
    } else {
        showResult();
    }
    nextButton.style.display = 'none';
}

function showResult() {
    progressBar.style.width = `100%`;
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreElement.textContent = `${score} / ${questions.length}`;
}



restartButton.addEventListener('click', () => {
    resultContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    startQuiz();
});

nextButton.addEventListener('click', nextQuestion);

startQuiz();
