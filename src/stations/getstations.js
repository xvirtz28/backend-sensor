const express = require('express');
const router = express.Router();
const SensorData = require('../index'); // Import the model

// Route to create new sensor data
router.post('/sensor-data', async (req, res) => {
  try {
    const { timestamp, value, stationCode, key } = req.body;

    // Create a new sensor data entry
    const sensorData = new SensorData({
      timestamp,
      value,
      stationCode,
      key
    });

    // Save to database
    await sensorData.save();
    res.status(201).send(sensorData);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
