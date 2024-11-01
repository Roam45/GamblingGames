<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gambling Games</title>
    <link rel="stylesheet" href="styles.css">
    <script type="module">
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";
        import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
        import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyBMfSTkHYHbceLi1xL8M01v3CeB7QBjpX0",
            authDomain: "gamblinggames-53531.firebaseapp.com",
            projectId: "gamblinggames-53531",
            storageBucket: "gamblinggames-53531.appspot.com",
            messagingSenderId: "626974281505",
            appId: "1:626974281505:web:4ab370afa26bb03c423860",
            measurementId: "G-K7PGD90X6T"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const auth = getAuth(app);
        const db = getFirestore(app);

        // Sign Up Function
        window.signUp = async function() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await setDoc(doc(db, 'users', user.uid), { balance: 100 });
                document.getElementById('authMessage').innerText = 'Sign up successful! Welcome!';
                document.getElementById('gameContainer').style.display = 'block';
            } catch (error) {
                document.getElementById('authMessage').innerText = error.message;
            }
        };

        // Sign In Function
        window.signIn = async function() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                document.getElementById('authMessage').innerText = 'Sign in successful!';
                document.getElementById('gameContainer').style.display = 'block';
                loadUserBalance(user.uid);
            } catch (error) {
                document.getElementById('authMessage').innerText = error.message;
            }
        };

        // Load User Balance
        async function loadUserBalance(uid) {
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                document.getElementById('balanceAmount').innerText = userData.balance;
            }
        }

        // Auth State Listener
        auth.onAuthStateChanged((user) => {
            if (user) {
                loadUserBalance(user.uid);
                document.getElementById('gameContainer').style.display = 'block';
            } else {
                document.getElementById('gameContainer').style.display = 'none';
            }
        });
    </script>
</head>
<body>
    <h1>Gambling Games</h1>
    <div id="gameContainer" style="display: none;">
        <select id="gameSelector" onchange="loadGame()">
            <option value="">Select a Game</option>
            <option value="coinFlip">Coin Flip</option>
            <option value="diceRoll">Dice Roll</option>
            <option value="roulette">Roulette</option>
            <option value="poker">Poker</option>
        </select>
        <div id="gameArea"></div>
        <div id="result"></div>
    </div>

    <div id="contact">
        <h2>Contact Us</h2>
        <p>If you have any questions or feedback, feel free to reach out:</p>
        <p>Email: <a href="mailto:BeggadsBeGone@gmail.com">BeggadsBeGone@gmail.com</a></p>
        <p><a href="https://github.com/Roam45/GamblingGames">Provide changes</a></p>
    </div>

    <div id="authContainer">
        <h2>Sign In / Sign Up</h2>
        <input type="email" id="email" placeholder="Email" required>
        <input type="password" id="password" placeholder="Password" required>
        <button onclick="signUp()">Sign Up</button>
        <button onclick="signIn()">Sign In</button>
        <div id="authMessage"></div>
    </div>

    <footer>
        <p>&copy; 2024 Gambling Games. All rights reserved.</p>
    </footer>
</body>
</html>
