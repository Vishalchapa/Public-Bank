// -------------------------------------------------------------- Mortgagae Calculator --------------------------------------------------------------

document.getElementById('calculateButton').addEventListener('click', calculateMortgage);
document.getElementById('clearHistoryButton').addEventListener('click', clearHistory);

document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('input', updateLiveResults);
});

function calculateMortgage() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseInt(document.getElementById('loanTerm').value);

    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm)) {
        showResult('Please enter valid values.', 'error');
        return;
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment =
        (loanAmount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    const totalPayment = (monthlyPayment * numberOfPayments).toFixed(2);
    const totalInterest = (totalPayment - loanAmount).toFixed(2);
    const monthlyPaymentFormatted = monthlyPayment.toFixed(2);

    showResult(`Monthly Payment: £${monthlyPaymentFormatted}`, 'success');
    addToHistory(loanAmount, interestRate, loanTerm, monthlyPaymentFormatted, totalPayment, totalInterest);
}

function updateLiveResults() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseInt(document.getElementById('loanTerm').value);

    if (!isNaN(loanAmount) && !isNaN(interestRate) && !isNaN(loanTerm)) {
        const monthlyInterestRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;
        const monthlyPayment =
            (loanAmount * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

        const monthlyPaymentFormatted = monthlyPayment.toFixed(2);
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = `Estimated Monthly Payment: £${monthlyPaymentFormatted}`;
        resultDiv.style.opacity = 1;
    }
}

function showResult(message, status) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = message;
    resultDiv.className = `result £{status}`;
    resultDiv.style.opacity = 1;

    // -------------------------------------------------------------- Show feedback modal --------------------------------------------------------------
    showModal(message);
}

function addToHistory(loanAmount, interestRate, loanTerm, monthlyPayment, totalPayment, totalInterest) {
    const historyList = document.getElementById('historyList');
    const historyItem = document.createElement('li');
    historyItem.textContent =
        `Loan: £${loanAmount}, Rate: ${interestRate}%, Term: ${loanTerm} years - Monthly: £${monthlyPayment}, Total: £${totalPayment}, Interest: £${totalInterest}`;
    historyList.appendChild(historyItem);
}

function clearHistory() {
    const historyList = document.getElementById('historyList');
    while (historyList.firstChild) {
        historyList.removeChild(historyList.firstChild);
    }
    showResult('History cleared.', 'success');
}

function showModal(message) {
    const modal = document.getElementById('feedbackModal');
    const modalText = document.getElementById('modalText');
    const closeBtn = document.querySelector('.modal .close');

    modalText.textContent = message;
    modal.style.display = 'block';

    closeBtn.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}

// -------------------------------------------------------------- Initialize event listeners for tooltips --------------------------------------------------------------
document.querySelectorAll('.input-group').forEach(group => {
    group.addEventListener('mouseover', () => {
        const tooltip = group.querySelector('.tooltip');
        if (tooltip) tooltip.style.display = 'block';
    });

    group.addEventListener('mouseout', () => {
        const tooltip = group.querySelector('.tooltip');
        if (tooltip) tooltip.style.display = 'none';
    });
});

// -------------------------------------------------------------- Investment Quiz --------------------------------------------------------------

const quizData = [{
        question: "What is a stock?",
        options: [
            "A type of loan",
            "A share in the ownership of a company",
            "A government bond",
            "A savings account"
        ],
        correct: 1
    },
    {
        question: "Which is generally safer: stocks or bonds?",
        options: [
            "Stocks",
            "Bonds",
            "Both are equally risky",
            "Neither"
        ],
        correct: 1
    },
    {
        question: "What is a mutual fund?",
        options: [
            "A type of retirement account",
            "A collection of investments pooled together",
            "A loan from multiple banks",
            "A type of insurance"
        ],
        correct: 1
    },
    {
        question: "What does ROI stand for?",
        options: [
            "Rate of Interest",
            "Return on Investment",
            "Risk of Investment",
            "Reserve of Income"
        ],
        correct: 1
    },
    {
        question: "Which of the following is considered a high-risk investment?",
        options: [
            "Government bonds",
            "Savings accounts",
            "Penny stocks",
            "Certificate of deposit (CD)"
        ],
        correct: 2
    },
    {
        question: "What is diversification in investing?",
        options: [
            "Investing all your money in one stock",
            "Spreading your investments across different assets",
            "Investing only in foreign markets",
            "Avoiding investment risks altogether"
        ],
        correct: 1
    },
    {
        question: "What is an ETF?",
        options: [
            "Electronic Transfer Fund",
            "Exchange Traded Fund",
            "Emergency Trust Fund",
            "Equity Trust Fund"
        ],
        correct: 1
    },
    {
        question: "What does the term 'bull market' refer to?",
        options: [
            "A market condition where prices are falling",
            "A market condition where prices are rising",
            "A market condition with no significant movement",
            "A market condition where all stocks are undervalued"
        ],
        correct: 1
    },
    {
        question: "What is a blue-chip stock?",
        options: [
            "A stock with a high dividend yield",
            "A stock from a large, well-established company",
            "A stock that is very volatile",
            "A stock in the technology sector"
        ],
        correct: 1
    },
    {
        question: "What is a bond?",
        options: [
            "A type of stock",
            "A loan made to a corporation or government",
            "A savings account",
            "An equity investment"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const quizContainer = document.getElementById('quiz-container');
const scoreContainer = document.getElementById('score-container');
const progressContainer = document.getElementById('progress-container');
const restartBtn = document.getElementById('restart-btn');
const wrongModal = document.getElementById('wrong-modal');

function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        showScore();
        return;
    }

    const questionData = quizData[currentQuestion];
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = `<h3>${questionData.question}</h3>`;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    questionData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.innerText = option;
        optionElement.addEventListener('click', () => checkAnswer(index, optionElement));
        optionsElement.appendChild(optionElement);
    });

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);

    updateProgress();
    answered = false;
}

function checkAnswer(selectedOption, optionElement) {
    if (answered) return; // Prevent multiple answers for the same question
    answered = true;

    const questionData = quizData[currentQuestion];
    const optionsElements = document.querySelectorAll('.option');

    if (selectedOption === questionData.correct) {
        optionElement.classList.add('correct');
        score++;
        currentQuestion++;
        setTimeout(loadQuestion, 1500); // Load next question after a short delay
    } else {
        optionElement.classList.add('incorrect');
        showModal(); // Show the "Try Again" modal
    }
}

function showScore() {
    quizContainer.innerHTML = '';
    scoreContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;

    if (score === quizData.length) {
        triggerCrackers();
    }

    restartBtn.style.display = 'block';
}

function updateProgress() {
    progressContainer.innerHTML = `Question ${currentQuestion + 1} of ${quizData.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    restartBtn.style.display = 'none';
    loadQuestion();
    scoreContainer.innerHTML = '';
    progressContainer.innerHTML = '';
}

function triggerCrackers() {
    const confettiCount = 100;
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 4000); // Remove confetti after animation ends
    }
}

function getRandomColor() {
    const colors = ['#ffdd57', '#ff4444', '#ff85a1', '#51a8dd', '#78c5d6'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function showModal() {
    wrongModal.style.display = 'block';
}

function closeModal() {
    wrongModal.style.display = 'none';
    answered = false; // Allow the user to try the question again
}

loadQuestion();