require('dotenv').config();  // Load environment variables
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json()); 

// Import API routes
const ApiRouter = require("./src/routes/api");

// Use the imported routes with appropriate paths
app.use("/api/test", ApiRouter.TestRoute);
app.use("/api/user", ApiRouter.UserRoute);

// Handle undefined routes
app.all("*", (req, res) => {
  res.status(404).json({
    result: "ERR",
    payload: {
      error: "Invalid path",
    },
  });
});

// Create an HTTP server
const server = http.createServer(app);

// Function to initialize the server and database connection
const initialize = async () => {
  try {
    // Connect to MongoDB using the connection string from .env
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Successfully Connected to MongoDB Server");

    // Start the server
    server.listen(process.env.SERVER_PORT, () => {
      console.log(`Server listening on port ${process.env.SERVER_PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB or starting the server:", err);
    process.exit(1); // Exit process if there's a failure
  }
};

// Start the server and initialize the database connection
initialize();
