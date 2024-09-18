const express = require('express');
const mongoose = require('mongoose');
const sensor = require('./src/stations/getstations'); // Import the routes

const app = express();
app.use(express.json());

const port = process.env.SERVER_PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Successfully connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection failed:', err);
  process.exit(1);
});

// Use the sensor routes
app.use('/api', sensor);

app.listen(port, () => {
  console.log(`Server is running on port ${DB_CONNECTION_STRING}`);
});
