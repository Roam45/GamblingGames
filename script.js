function loadGame() {
    const game = document.getElementById('gameSelector').value;
    const gameArea = document.getElementById('gameArea');
    const resultArea = document.getElementById('result');

    gameArea.innerHTML = '';
    resultArea.innerHTML = '';

    switch (game) {
        case 'coinFlip':
            gameArea.innerHTML = `<button onclick="coinFlip()">Flip Coin</button>`;
            break;
        case 'diceRoll':
            gameArea.innerHTML = `<button onclick="rollDice()">Roll Dice</button>`;
            break;
        case 'roulette':
            gameArea.innerHTML = `<button onclick="spinRoulette()">Spin Roulette</button>`;
            break;
        case 'poker':
            gameArea.innerHTML = `<button onclick="playPoker()">Play Poker</button>`;
            break;
        default:
            break;
    }
}

function coinFlip() {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    document.getElementById('result').innerText = `Result: ${result}`;
}

function rollDice() {
    const result = Math.floor(Math.random() * 6) + 1;
    document.getElementById('result').innerText = `You rolled a ${result}`;
}

function spinRoulette() {
    const result = Math.floor(Math.random() * 37); // 0-36
    document.getElementById('result').innerText = `Roulette result: ${result}`;
}

function playPoker() {
    const result = 'Poker is complex! Try again.';
    document.getElementById('result').innerText = result;
}
