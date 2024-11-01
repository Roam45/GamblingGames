// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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
        if (email === "BeggadsBeGone@gmail.com") {
            loadAllUserBalances();
        } else {
            document.getElementById('allBalances').innerHTML = ''; // Clear balances for non-admin users
        }
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

// Load All User Balances for Admin
async function loadAllUserBalances() {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    let balancesList = '<h3>User Balances:</h3>';

    usersSnapshot.forEach(doc => {
        const userData = doc.data();
        balancesList += `<p>User ID: ${doc.id}, Balance: ${userData.balance}</p>`;
    });

    document.getElementById('allBalances').innerHTML = balancesList;
}

// Auth State Listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        loadUserBalance(user.uid);
        document.getElementById('gameContainer').style.display = 'block';
    } else {
        document.getElementById('gameContainer').style.display = 'none';
    }
});
