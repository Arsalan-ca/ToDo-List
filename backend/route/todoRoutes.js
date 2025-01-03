//"StAuth10244: I Mohammad Moaddeli, 000869829 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement.
//  I have not made my work available to anyone else."

const express = require('express');
const { db } = require('../firebaseConfig'); 
const { ref, get, set, remove, update } = require('firebase/database');

const router = express.Router();
const todoRef = ref(db, 'todos');  
// GET /load: Fetch all todo items from the Realtime Database
router.get('/load', async (req, res) => {
  try {
    const snapshot = await get(todoRef);  
    if (snapshot.exists()) {
      const todos = snapshot.val();  
      res.json(todos);  
    } else {
      res.json([]);  
    }
  } catch (error) {
    console.error("Error loading todos:", error);
    res.status(500).json({ error: "Error loading todos: " + error.message });
  }
});

// POST /save: Save the todo list to the Realtime Database
router.post('/save', async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const todos = Array.isArray(req.body) ? req.body : [];
    if (todos.length === 0) {
      return res.status(400).send("Invalid or empty TODO list.");
    }

    await set(todoRef, todos);

    res.json({ status: "save successful" });
  } catch (error) {
    console.error("Error saving todos:", error);
    res.status(500).send("Error saving todos: " + error.message);
  }
});

// GET /clear: Clear all todo items from the Realtime Database
router.get('/clear', async (req, res) => {
  try {
    await remove(todoRef);

    res.json({ status: "clear successful" });
  } catch (error) {
    console.error("Error clearing todos:", error);
    res.status(500).json({ error: "Error clearing todos: " + error.message });
  }
});

module.exports = router;
