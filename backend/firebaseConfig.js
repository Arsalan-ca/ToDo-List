// /backend/firebaseConfig.js

const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database"); 

const firebaseConfig = {
 // Add your configuration API key here.
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

module.exports = { db };  // Use module.exports to export db
