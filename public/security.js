import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 1. Your Firebase Config (Copy this from your main file)
const firebaseConfig = {
    apiKey: "AIzaSyAlpEfar5odDfV9c2bbmaIpAt5fJJfbez4",
    authDomain: "software-peer-support.firebaseapp.com",
    projectId: "software-peer-support",
    storageBucket: "software-peer-support.firebasestorage.app",
    messagingSenderId: "43088815786",
    appId: "1:43088815786:web:4332760b0fef1b7ae152d3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. Identify the user
const uid = sessionStorage.getItem("uid") || localStorage.getItem("uid");

if (uid) {
    // 3. LISTEN for ban changes in real-time
    onSnapshot(doc(db, "bans", uid), (snapshot) => {
        if (snapshot.exists()) {
            const banData = snapshot.data();
            const now = new Date();
            
            // Handle Firestore Timestamps
            const expiry = banData.expiresAt ? banData.expiresAt.toDate() : null;

            // 4. If ban is active, kick them out
            if (banData.duration === 'permanent' || (expiry && expiry > now)) {
                alert("🔴 Your account has been restricted. You are being redirected.");
                
                // Clear all login data
                sessionStorage.clear();
                localStorage.clear();
                
                // Redirect to landing page
                window.location.href = "index.html";
            }
        }
    });
}