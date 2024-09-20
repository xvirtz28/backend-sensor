require('dotenv').config();  // Load environment variables
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const app = express();



app.use(express.static('public'))
app.use(express.json()); 

const ApiRouter = require("./src/routes/api");

app.use("/api/test", ApiRouter.TestRoute);
app.use("/api/user", ApiRouter.UserRoute);

app.all("*", (req, res) => {
  res.status(404).json({
    result: "ERR",
    payload: {
      error: "Invalid path",
    },
  });
});
  
const server = http.createServer(app);

const initialize = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Successfully Connected to MongoDB Server");

    server.listen(process.env.SERVER_PORT, () => {
      console.log(`Server listening on port ${process.env.SERVER_PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB or starting the server:", err);
    process.exit(1);
  }
};

initialize();
