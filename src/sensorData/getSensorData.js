const express = require('express');
const router = express.Router();
const SensorData = require('../index'); // Import the model

// Route to get all sensor data
router.get('/sensor-data', async (req, res) => {
  try {
    const sensorData = await SensorData.find(); // Retrieve all documents from the collection
    res.status(200).json(sensorData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
