// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMfSTkHYHbceLi1xL8M01v3CeB7QBjpX0",
    authDomain: "gamblinggames-53531.firebaseapp.com",
    projectId: "gamblinggames-53531",
    storageBucket: "gamblinggames-53531.appspot.com",
    messagingSenderId: "626974281505",
    appId: "1:626974281505:web:4ab370afa26bb03c423860",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign Up Function
window.signUp = async function() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), { balance: 100 });
        document.getElementById('authMessage').innerText = 'Sign up successful! Welcome!';
    } catch (error) {
        document.getElementById('authMessage').innerText = error.message;
        console.error("Sign up error:", error); // Log error details
    }
};

// Sign In Function
window.signIn = async function() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    console.log("Attempting to sign in with:", email); // Debug log

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        document.getElementById('authMessage').innerText = 'Sign in successful!';
        loadUserBalance(user.uid);
        
        if (email === "BeggadsBeGone@gmail.com") {
            loadAllUserBalances();
        } else {
            document.getElementById('allBalances').innerHTML = ''; // Clear balances for non-admin users
        }
    } catch (error) {
        console.error("Sign in error:", error); // Log error details
        document.getElementById('authMessage').innerText = error.message;
    }
};

// Load User Balance Function
async function loadUserBalance(uid) {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            const data = userDoc.data();
            document.getElementById('userBalance').innerText = `Your Balance: $${data.balance}`;
        } else {
            console.log("No such user!");
        }
    } catch (error) {
        console.error("Error loading user balance:", error);
    }
}

// Load All User Balances Function (Admin only)
async function loadAllUserBalances() {
    try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        let balances = '';
        usersSnapshot.forEach(doc => {
            const data = doc.data();
            balances += `<p>${doc.id}: $${data.balance}</p>`;
        });
        document.getElementById('allBalances').innerHTML = balances;
    } catch (error) {
        console.error("Error loading all user balances:", error);
    }
}

// Optional: Monitor Auth State
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in:", user);
    } else {
        console.log("No user is signed in.");
    }
});
