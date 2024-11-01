let users = {}; // Store user data
let currentUser = null;

function signup() {
    const username = document.getElementById('username').value;
    if (username) {
        users[username] = { balance: 100 }; // Initialize user with a balance
        currentUser = username;
        document.getElementById('balanceAmount').innerText = users[username].balance;
        document.getElementById('signupMessage').innerText = `Account created for ${username}!`;
        updateLeaderboard();
        document.getElementById('username').value = ''; // Clear input
    } else {
        document.getElementById('signupMessage').innerText = 'Please enter a username.';
    }
}

function loadGame() {
    const game = document.getElementById('gameSelector').value;
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = '';

    if (game) {
        gameArea.innerHTML = `
            <input type="number" id="betAmount" placeholder="Enter your bet" min="1" max="${users[currentUser].balance}">
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

    if (betAmount > 0 && betAmount <= users[currentUser].balance) {
        users[currentUser].balance -= betAmount; // Deduct bet from balance
        const result = getResult();
        resultArea.innerText = `Result: ${result}`;

        // Simulate win/loss
        const win = Math.random() < 0.5; // 50% chance to win
        if (win) {
            const payout = betAmount * 2; // Win double
            users[currentUser].balance += payout;
            resultArea.innerText += ` - You win! Total: $${users[currentUser].balance}`;
        } else {
            resultArea.innerText += ` - You lose! Total: $${users[currentUser].balance}`;
        }

        // Update balance display
        document.getElementById('balanceAmount').innerText = users[currentUser].balance;

        // Update leaderboard
        updateLeaderboard();
    } else {
        resultArea.innerText = `Invalid bet. Your balance: $${users[currentUser].balance}`;
    }
}

function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = ''; // Clear existing leaderboard

    for (const user in users) {
        const li = document.createElement('li');
        li.innerText = `${user}: $${users[user].balance}`;
        leaderboardList.appendChild(li);
    }
}
