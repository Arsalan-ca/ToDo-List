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
