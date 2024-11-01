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
    } else if (game === 'blackjack') {
        blackjackGame();
    }
    updateBalanceDisplay();
}

function updateBalanceDisplay() {
    const resultArea = document.getElementById('result');
    resultArea.innerHTML = 'Current Balance: $' + balance;
    localStorage.setItem('balance', balance); // Save balance to localStorage
}

function blackjackGame() {
    const gameArea = document.getElementById('gameArea');
    const resultArea = document.getElementById('result');

    const betInput = document.createElement('input');
    betInput.type = 'number';
    betInput.placeholder = 'Enter your bet';
    betInput.min = 1;

    const button = document.createElement('button');
    button.innerText = 'Deal Cards';
    button.onclick = function () {
        const bet = parseInt(betInput.value);
        if (bet > balance || bet <= 0 || isNaN(bet)) {
            resultArea.innerText = 'Invalid bet!';
            return;
        }

        balance -= bet;
        const playerCards = [drawCard(), drawCard()];
        const dealerCards = [drawCard(), drawCard()];

        const playerTotal = calculateTotal(playerCards);
        const dealerTotal = calculateTotal(dealerCards);

        resultArea.innerText = `Your cards: ${playerCards.join(', ')} (Total: ${playerTotal})\nDealer's cards: ${dealerCards[0]}, ?`;

        // Check for blackjack
        if (playerTotal === 21) {
            balance += bet * 2.5; // Player wins with blackjack
            resultArea.innerText += '\nYou hit a Blackjack! You win!';
        } else {
            // Allow player to choose to hit or stand
            const hitButton = document.createElement('button');
            hitButton.innerText = 'Hit';
            hitButton.onclick = function () {
                playerCards.push(drawCard());
                const newPlayerTotal = calculateTotal(playerCards);
                resultArea.innerText = `Your cards: ${playerCards.join(', ')} (Total: ${newPlayerTotal})\nDealer's cards: ${dealerCards[0]}, ?`;

                if (newPlayerTotal > 21) {
                    resultArea.innerText += '\nYou bust! Dealer wins!';
                } else {
                    // Player can choose to stand
                    const standButton = document.createElement('button');
                    standButton.innerText = 'Stand';
                    standButton.onclick = function () {
                        resultArea.innerText += `\nDealer's cards: ${dealerCards.join(', ')} (Total: ${dealerTotal})`;

                        // Dealer plays
                        while (dealerTotal < 17) {
                            dealerCards.push(drawCard());
                        }
                        const finalDealerTotal = calculateTotal(dealerCards);
                        if (finalDealerTotal > 21) {
                            resultArea.innerText += '\nDealer busts! You win!';
                            balance += bet * 2; // Player wins
                        } else if (finalDealerTotal > playerTotal) {
                            resultArea.innerText += '\nDealer wins!';
                        } else if (finalDealerTotal < playerTotal) {
                            resultArea.innerText += '\nYou win!';
                            balance += bet * 2; // Player wins
                        } else {
                            resultArea.innerText += '\nIt\'s a tie!';
                            balance += bet; // Return bet
                        }
                        updateBalanceDisplay();
                    };
                    gameArea.appendChild(standButton);
                }
                updateBalanceDisplay();
            };
            gameArea.appendChild(hitButton);
        }

        updateBalanceDisplay();
    };

    gameArea.appendChild(betInput);
    gameArea.appendChild(button);
}

function drawCard() {
    return Math.floor(Math.random() * 10) + 1; // Simulating a card from 1 to 10
}

function calculateTotal(cards) {
    return cards.reduce((total, card) => total + card, 0);
}

// Placeholder functions for other games
function coinFlipGame() { /* Existing coin flip logic */ }
function diceRollGame() { /* Existing dice roll logic */ }
function rouletteGame() { /* Existing roulette logic */ }
function pokerGame() { /* Existing poker logic */ }

// Load the selected game on page load
window.onload = function () {
    const savedGame = localStorage.getItem('selectedGame');
    if (savedGame) {
        document.getElementById('gameSelector').value = savedGame;
        loadGame();
    }
    updateBalanceDisplay();
};
