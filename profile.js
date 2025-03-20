// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8T0db-qk2sFbeI5uYQG6r48lhSo_LaGE",
    authDomain: "pahe-fantasy-firebase.firebaseapp.com",
    projectId: "pahe-fantasy-firebase",
    storageBucket: "pahe-fantasy-firebase.appspot.com",
    messagingSenderId: "976823822883",
    appId: "1:976823822883:web:1aa16c907b536f779a1f96",
    measurementId: "G-G74CHEMKXV"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// DOM Elements
const profilePic = document.getElementById("profilePic");
const newProfilePic = document.getElementById("newProfilePic");
const emailField = document.getElementById("email");
const genderField = document.getElementById("gender");
const cityField = document.getElementById("city");
const countyField = document.getElementById("county");
const regionField = document.getElementById("region");
const streetField = document.getElementById("street");
const zipcodeField = document.getElementById("zipcode");
const saveChangesBtn = document.getElementById("saveChanges");

// Check authentication state
onAuthStateChanged(auth, async (user) => {
    if (user) {
        emailField.textContent = user.email;
        loadUserProfile(user.uid);
    } else {
        window.location.href = "login.html"; // Redirect if not logged in
    }
});

// Load user profile data
async function loadUserProfile(uid) {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const userData = userSnap.data();
        genderField.value = userData.gender || "Other";
        cityField.value = userData.city || "";
        countyField.value = userData.county || "";
        regionField.value = userData.region || "";
        streetField.value = userData.street || "";
        zipcodeField.value = userData.zipcode || "";
        profilePic.src = userData.profilePic || "default-pic.png";
    }
}

// Save profile updates
saveChangesBtn.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
        gender: genderField.value,
        city: cityField.value,
        county: countyField.value,
        region: regionField.value,
        street: streetField.value,
        zipcode: zipcodeField.value,
    }, { merge: true });

    alert("Profile updated successfully!");
});

// Profile picture upload
newProfilePic.addEventListener("change", async (event) => {
    const user = auth.currentUser;
    if (!user) return;

    const file = event.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `profile_pictures/${user.uid}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "users", user.uid), { profilePic: downloadURL });
    profilePic.src = downloadURL;
    alert("Profile picture updated!");
});

// Logout function
window.logout = function () {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
};
