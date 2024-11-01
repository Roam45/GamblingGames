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
    localStorage.setItem('selectedGame', game); // Save selected game
}

function updateBalanceDisplay() {
    const resultArea = document.getElementById('result');
    resultArea.innerHTML = 'Current Balance: $' + balance;
    localStorage.setItem('balance', balance); // Save balance to localStorage
}

function coinFlipGame() {
    const gameArea = document.getElementById('gameArea');
    const resultArea = document.getElementById('result');

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'input-wrapper';

    const betInput = document.createElement('input');
    betInput.type = 'number';
    betInput.placeholder = 'Enter your bet';

    const choiceSelect = document.createElement('select');
    const headsOption = document.createElement('option');
    headsOption.value = 'heads';
    headsOption.innerText = 'Heads';
    const tailsOption = document.createElement('option');
    tailsOption.value = 'tails';
    tailsOption.innerText = 'Tails';
    choiceSelect.appendChild(headsOption);
    choiceSelect.appendChild(tailsOption);

    const button = document.createElement('button');
    button.innerText = 'Flip Coin';
    button.onclick = function () {
        const bet = parseInt(betInput.value);
        const playerChoice = choiceSelect.value;

        if (bet > balance || bet <= 0 || isNaN(bet)) {
            resultArea.innerText = 'Invalid bet!';
            return;
        }

        balance -= bet;
        const coinResult = Math.random() < 0.5 ? 'heads' : 'tails';

        resultArea.innerText = 'Coin landed on ' + coinResult + '.';

        if (playerChoice === coinResult) {
            balance += bet * 2; // Double the bet if won
            resultArea.innerText += ' You won!';
        } else {
            resultArea.innerText += ' You lost!';
        }

        updateBalanceDisplay();

        if (balance <= 0) {
            resetGame();
            resultArea.innerText += ' You went bankrupt in "Coin Flip Game". Your balance has been reset.';
        }
    };

    inputWrapper.appendChild(betInput);
    gameArea.appendChild(inputWrapper);
    gameArea.appendChild(choiceSelect);
    gameArea.appendChild(button);
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
    numberInput.min = 2; // Minimum sum of two dice
    numberInput.max = 12; // Maximum sum of two dice

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
        const dice1 = Math.floor(Math.random() * 6) + 1; // Roll first die (1-6)
        const dice2 = Math.floor(Math.random() * 6) + 1; // Roll second die (1-6)
        const sum = dice1 + dice2;

        resultArea.innerText = 'You rolled a ' + dice1 + ' and ' + dice2 + ' (Total: ' + sum + ').';

        const won = sum === playerNumber; // Win if the sum matches player’s number
        if (won) {
            balance += bet * 2; // Player wins
            resultArea.innerText += ' You won!';
        } else {
            resultArea.innerText += ' You lost!';
        }

        updateBalanceDisplay();

        if (balance <= 0) {
            resetGame();
            resultArea.innerText += ' You went bankrupt in "Dice Roll Game". Your balance has been reset.';
        }
    };

    inputWrapperBet.appendChild(betInput);
    gameArea.appendChild(inputWrapperBet);

    inputWrapperNumber.appendChild(numberInput);
    gameArea.appendChild(inputWrapperNumber);

    gameArea.appendChild(button);
}

function rouletteGame() {
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
    numberInput.placeholder = 'Pick a number (0-36)';
    numberInput.min = 0;
    numberInput.max = 36;

    const button = document.createElement('button');
    button.innerText = 'Spin Roulette';
    button.onclick = function () {
        const bet = parseInt(betInput.value);
        const playerNumber = parseInt(numberInput.value);

        if (bet > balance || bet <= 0 || isNaN(bet) || playerNumber < 0 || playerNumber > 36 || isNaN(playerNumber)) {
            resultArea.innerText = 'Invalid bet or number!';
            return;
        }

        balance -= bet;
        const winningNumber = Math.floor(Math.random() * 37); // 0-36

        if (playerNumber === winningNumber) {
            balance += bet * 36; // Win pays 36:1
            resultArea.innerText = 'The winning number is ' + winningNumber + '. You won!';
        } else {
            resultArea.innerText = 'The winning number is ' + winningNumber + '. You lost!';
        }

        updateBalanceDisplay();

        if (balance <= 0) {
            resetGame();
            resultArea.innerText += ' You went bankrupt in "Roulette Game". Your balance has been reset.';
        }
    };

    inputWrapperBet.appendChild(betInput);
    gameArea.appendChild(inputWrapperBet);

    inputWrapperNumber.appendChild(numberInput);
    gameArea.appendChild(inputWrapperNumber);

    gameArea.appendChild(button);
}

function pokerGame() {
    const gameArea = document.getElementById('gameArea');
    const resultArea = document.getElementById('result');

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'input-wrapper';

    const betInput = document.createElement('input');
    betInput.type = 'number';
    betInput.placeholder = 'Enter your bet';

    const button = document.createElement('button');
    button.innerText = 'Play Poker';
    button.onclick = function () {
        const bet = parseInt(betInput.value);
        if (bet > balance || bet <= 0 || isNaN(bet)) {
            resultArea.innerText = 'Invalid bet!';
            return;
        }

        balance -= bet;
        const playerCard = Math.floor(Math.random() * 13) + 1; // Player's card (1-13)
        const dealerCard = Math.floor(Math.random() * 13) + 1; // Dealer's card (1-13)

        resultArea.innerText = 'Your card: ' + playerCard + ', Dealer\'s card: ' + dealerCard;

        const won = Math.random() >= 0.7; // Rigged to lose 70%
        if (won) {
            balance += bet * 2; // Player wins
            resultArea.innerText += ' You win!';
        } else if (playerCard < dealerCard) {
            resultArea.innerText += ' You lose!';
        } else {
            balance += bet; // Tie, return bet
            resultArea.innerText += ' It\'s a tie!';
        }

        updateBalanceDisplay();

        if (balance <= 0) {
            resetGame();
            resultArea.innerText += ' You went bankrupt in "Poker Game". Your balance has been reset.';
        }
    };

    inputWrapper.appendChild(betInput);
    gameArea.appendChild(inputWrapper);
    gameArea.appendChild(button);
}

function resetGame() {
    balance = 100; // Reset balance
    localStorage.setItem('balance', balance); // Update local storage
    document.getElementById('gameSelector').value = ''; // Clear selected game
    loadGame(); // Reload the game selection
}

// Load the selected game on page load
window.onload = function () {
    const savedGame = localStorage.getItem('selectedGame');
    if (savedGame) {
        document.getElementById('gameSelector').value = savedGame;
        loadGame();
    }
    updateBalanceDisplay();
};
