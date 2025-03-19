import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        // If logged in, show the user info or allow access
        console.log("User is logged in:", user.email);
    } else {
        // If not logged in, redirect to login page
        window.location.href = "login.html";
    }
});

// Handle logout button click
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            await signOut(auth);
            alert("Logged out successfully!");
            window.location.href = "login.html"; // Redirect to login page after logging out
        } catch (error) {
            console.error("Error logging out:", error);
            alert("An error occurred while logging out.");
        }
    });
}
