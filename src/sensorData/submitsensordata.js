const SensorData = require('../index'); // Import the sensor data model

// Function to submit sensor data
const submitSensorData = async (data) => {
  try {
    // Destructure the incoming data
    const { time, value, stationCode, stationKey } = data;

    // Create a new sensor data entry using the Mongoose model
    const newSensorData = new SensorData({
      time,
      value,
      stationCode,
      stationKey
    });

    // Save the new sensor data to MongoDB
    const savedData = await newSensorData.save();

    // Return the saved data or a success message
    return {
      success: true,
      data: savedData
    };
  } catch (err) {
    // Handle errors during data submission
    return {
      success: false,
      error: err.message
    };
  }
};

// Export the function to be used in other parts of your application
module.exports = {
  submitSensorData
};
