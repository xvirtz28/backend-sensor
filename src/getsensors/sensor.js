const mongoose = require('mongoose');

// Define the schema
const sensorDataSchema = new mongoose.Schema({
  timestamp: {
    type: Number, // Use Number for Unix time
    required: true
  },
  value: {
    type: Number, // Use Number for sensor values
    required: true
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create the model
const sensor = mongoose.model('SensorData', sensorDataSchema);

module.exports = sensor;
