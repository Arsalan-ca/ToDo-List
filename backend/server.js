//"StAuth10244: I Mohammad Moaddeli, 000869829 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement.
//  I have not made my work available to anyone else."

const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const todoRoutes = require('./route/todoRoutes'); // Import the routes

// Middleware
app.use(cors());
app.use(express.json());

app.use(todoRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
