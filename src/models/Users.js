const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  station_code: { type: String, required: true, unique: true },
  key: { type: String, required: true },
  channel: { type: String, required: true },
});

module.exports = mongoose.model('sensordevices', userSchema);
