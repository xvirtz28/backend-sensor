const mongoose = require("mongoose");
const SensorDataChannelSchema = mongoose.Schema({
    time: {
        type: Date
    },
    value: {
        type: Number
    }
});
const SensorDataStationSchema = mongoose.Schema({
    station_code: {
        type: String,
        required: true
    },
    channel0: [SensorDataChannelSchema],
    channel1: [SensorDataChannelSchema],
    channel2: [SensorDataChannelSchema]
});
const SensorDataMainSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    stations: [SensorDataStationSchema]
});
const SensorDataModel = mongoose.model("sersor_data", SensorDataMainSchema);
module.exports = SensorDataModel;












