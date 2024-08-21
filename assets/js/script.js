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

    showResult(`Monthly Payment: $${monthlyPaymentFormatted}`, 'success');
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
        resultDiv.textContent = `Estimated Monthly Payment: $${monthlyPaymentFormatted}`;
        resultDiv.style.opacity = 1;
    }
}

function showResult(message, status) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = message;
    resultDiv.className = `result ${status}`;
    resultDiv.style.opacity = 1;

    // Show feedback modal
    showModal(message);
}

function addToHistory(loanAmount, interestRate, loanTerm, monthlyPayment, totalPayment, totalInterest) {
    const historyList = document.getElementById('historyList');
    const historyItem = document.createElement('li');
    historyItem.textContent = 
        `Loan: $${loanAmount}, Rate: ${interestRate}%, Term: ${loanTerm} years - Monthly: $${monthlyPayment}, Total: $${totalPayment}, Interest: $${totalInterest}`;
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

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}

// Initialize event listeners for tooltips
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
