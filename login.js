import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login-form");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.querySelector("#email").value.trim();
        const password = document.querySelector("#password").value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            window.location.href = "home.html"; // Redirect to home page or dashboard
        } catch (error) {
            alert("Error: " + error.message);
        }
    });
});
