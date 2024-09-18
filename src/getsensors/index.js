const express = require('express');
const router = express.Router();
const Sensor = require('../models/sensor'); // Assuming you have a sensor model

// GET all sensors
router.get('/', async (req, res) => {
  try {
    const sensors = await Sensor.find(); // Fetch all sensors from the database
    res.status(200).json({
      result: 'OK',
      payload: sensors,
    });
  } catch (err) {
    console.error('Error fetching sensors:', err);
    res.status(500).json({
      result: 'ERR',
      payload: {
        error: 'Failed to fetch sensors',
      },
    });
  }
});

module.exports = router;
