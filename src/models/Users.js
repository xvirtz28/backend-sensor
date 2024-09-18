const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  station_code: {
    type: String,
    required: true,
    unique: true // Ensure each station code is unique
  },
  key: {
    type: String,
    required: true  
  },
  channel: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    default: ["SensorDevice"]
  }
});

const UserModel = mongoose.model("SensorDevice", UserSchema);

module.exports = UserModel;
