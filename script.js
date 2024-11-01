let balance = 100; // Starting balance

function loadGame() {
    const game = document.getElementById('gameSelector').value;
    const gameArea = document.getElementById('gameArea');
    const resultArea = document.getElementById('result');
    
    gameArea.innerHTML = '';
    resultArea.innerHTML = '';

    if (game) {
        gameArea.innerHTML = `
            <input type="number" id="betAmount" placeholder="Enter your bet" min="1" max="${balance}">
            <button onclick="${game}()">Play</button>
        `;
    }
}

function coinFlip() {
    playGame(2, () => Math.random() < 0.5 ? 'Heads' : 'Tails');
}

function rollDice() {
    playGame(6, () => Math.floor(Math.random() * 6) + 1);
}

function spinRoulette() {
    playGame(37, () => Math.floor(Math.random() * 37));
}

function playPoker() {
    const result = 'Poker is complex! Try again.';
    document.getElementById('result').innerText = result;
}

function playGame(maxValue, getResult) {
    const betAmount = parseInt(document.getElementById('betAmount').value);
    const resultArea = document.getElementById('result');

    if (betAmount > 0 && betAmount <= balance) {
        balance -= betAmount; // Deduct bet from balance
        const result = getResult();
        resultArea.innerText = `Result: ${result}`;

        // Simulate win/loss
        const win = Math.random() < 0.5; // 50% chance to win
        if (win) {
            const payout = betAmount * 2; // Win double
            balance += payout;
            resultArea.innerText += ` - You win! Total: ${balance}`;
        } else {
            resultArea.innerText += ` - You lose! Total: ${balance}`;
        }
    } else {
        resultArea.innerText = `Invalid bet. Your balance: ${balance}`;
    }
}
