// Firebase App & Authentication via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8T0db-qk2sFbeI5uYQG6r48lhSo_LaGE",
  authDomain: "pahe-fantasy-firebase.firebaseapp.com",
  projectId: "pahe-fantasy-firebase",
  storageBucket: "pahe-fantasy-firebase.firebasestorage.app",
  messagingSenderId: "976823822883",
  appId: "1:976823822883:web:1aa16c907b536f779a1f96",
  measurementId: "G-G74CKEHXKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth };
