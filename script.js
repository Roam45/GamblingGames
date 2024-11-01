let balance = localStorage.getItem('balance') ? parseInt(localStorage.getItem('balance')) : 100;

function loadGame() {
    const gameArea = document.getElementById('gameArea');
    const resultArea = document.getElementById('result');
    gameArea.innerHTML = ''; // Clear previous game
    resultArea.innerHTML = ''; // Clear previous result

    const game = document.getElementById('gameSelector').value;
    if (game === 'coinFlip') {
        coinFlipGame();
    } else if (game === 'diceRoll') {
        diceRollGame();
    } else if (game === 'roulette') {
        rouletteGame();
    } else if (game === 'poker') {
        pokerGame();
    }
    updateBalanceDisplay();
}

function updateBalanceDisplay() {
    const resultArea = document.getElementById('result');
    resultArea.innerHTML = 'Current Balance: $' + balance;
    localStorage.setItem('balance', balance); // Save balance to localStorage
}

function diceRollGame() {
    const gameArea = document.getElementById('gameArea');
    const resultArea = document.getElementById('result');

    const inputWrapperBet = document.createElement('div');
    inputWrapperBet.className = 'input-wrapper';

    const betInput = document.createElement('input');
    betInput.type = 'number';
    betInput.placeholder = 'Enter your bet';

    const inputWrapperNumber = document.createElement('div');
    inputWrapperNumber.className = 'input-wrapper';

    const numberInput = document.createElement('input');
    numberInput.type = 'number';
    numberInput.placeholder = 'Pick a number (2-12)';
    numberInput.min = 2;
    numberInput.max = 12;

    const button = document.createElement('button');
    button.innerText = 'Roll Dice';
    button.onclick = function () {
        const bet = parseInt(betInput.value);
        const playerNumber = parseInt(numberInput.value);

        if (bet > balance || bet <= 0 || isNaN(bet) || playerNumber < 2 || playerNumber > 12 || isNaN(playerNumber)) {
            resultArea.innerText = 'Invalid bet or number!';
            return;
        }

        balance -= bet;

        // Roll two dice
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        const total = die1 + die2;

        if (total === playerNumber) {
            balance += bet * 2; // Player wins
            resultArea.innerText = `You rolled ${die1} and ${die2}. You won! Total: ${total}`;
        } else {
            resultArea.innerText = `You rolled ${die1} and ${die2}. You lost! Total: ${total}`;
        }

        updateBalanceDisplay();
    };

    inputWrapperBet.appendChild(betInput);
    gameArea.appendChild(inputWrapperBet);
    
    inputWrapperNumber.appendChild(numberInput);
    gameArea.appendChild(inputWrapperNumber);
    
    gameArea.appendChild(button);
}

// Other game functions remain the same...

// Load the selected game on page load
window.onload = function () {
    const savedGame = localStorage.getItem('selectedGame');
    if (savedGame) {
        document.getElementById('gameSelector').value = savedGame;
        loadGame();
    }
    updateBalanceDisplay();
};
