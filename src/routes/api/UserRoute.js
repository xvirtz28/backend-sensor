const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/UserController");
const Users = require("../../models/Users");

router.get("/profile", UserController.ProfileController);
router.post("/register", async (req, res) => {
const { station_code, key, channel } = req.body;

  if (!req.body) {
    return res.status(400).json({
      result: "ERR",
      payload: { error: "Missing required fields" },
    });
  }

  try {
    const findStation = await Users.findOne({ station_code }).exec();

    if (findStation) {
      return res.status(400).json({
        result: "ERR",
        payload: { error: "Station code already taken" },
      });
    }

    const newUser = { station_code, key, channel, roles: ["user"] };

    await Users.create(newUser);

    return res.json({
      result: "OK",
      payload: { user: newUser },
    });

  } catch (err) {
    console.error(err); // Use console.error for logging errors

    return res.status(500).json({
      result: "ERR",
      payload: { error: "Internal Server Error" },
    });
  }
});
router.delete("/delete", async (req, res) => {
  const { station_code } = req.body;

  // Check if the station_code is provided in the request body
  if (!station_code) {
    return res.status(400).json({
      result: "ERR",
      payload: { error: "station_code is required" },
    });
  }

  try {
    // Find and delete the sensor with the specified station_code
    const deletedSensor = await Users.findOneAndDelete({ station_code }).exec();

    // If no sensor was found with the given station_code, return an error
    if (!deletedSensor) {
      return res.status(404).json({
        result: "ERR",
        payload: { error: "Sensor not found" },
      });
    }

    // Return a success response if the sensor was deleted
    return res.json({
      result: "OK",
      payload: { message: "Sensor deleted successfully" },
    });

  } catch (err) {
    console.error("Error deleting sensor:", err); // Use console.error for logging errors

    // Return a server error response
    return res.status(500).json({
      result: "ERR",
      payload: { error: "Internal Server Error" },
    });
  }
});
module.exports = router;
