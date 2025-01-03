// /backend/firebaseConfig.js

const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database"); 

const firebaseConfig = {
  apiKey: "AIzaSyALNsQkGyUIRo3gsDp-wa30wn2_HKOsodI",
  authDomain: "assignment6-eb4ae.firebaseapp.com",
  databaseURL: "https://assignment6-eb4ae-default-rtdb.firebaseio.com",
  projectId: "assignment6-eb4ae",
  storageBucket: "assignment6-eb4ae.firebasestorage.app",
  messagingSenderId: "153071408691",
  appId: "1:153071408691:web:8f97899c44c1081667b546",
  measurementId: "G-VM42GWT1TF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

module.exports = { db };  // Use module.exports to export db
