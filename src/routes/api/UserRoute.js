const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/UserController");
const Users = require("../../models/Users");

router.get("/profile/:station_code", UserController.ProfileController);
router.post("/register", async (req, res) => {
const { station_code, key, channel } = req.body;

  if (!station_code || !key || !channel) {
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

    const newUser = { station_code, key, channel, roles: ["sensordevices"] };

    await Users.create(newUser);

    return res.json({
      result: "OK",
      payload: { user: newUser },
    });

  } catch (err) {
    console.error(err); 

    return res.status(500).json({
      result: "ERR",
      payload: { error: "Internal Server Error" },
    });
  }
});

router.delete("/delete", async (req, res) => {
  const { station_code } = req.body;

  if (!station_code) {
    return res.status(400).json({
      result: "ERR",
      payload: { error: "Missing station code" },
    });
  }

  try {
    const deletedSensor = await Users.findOneAndDelete({ station_code }).exec();

    if (!deletedSensor) {
      return res.status(404).json({
        status: "error",
        message: "Sensor not found",
      });
    }


    return res.json({
      status: "success",
      message: "The sensor has been deleted",
    });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});
router.put("/update/:station_code", async (req, res) => {
  const { station_code } = req.params;
  const { key, channel } = req.body;

  // Check for missing required fields
  if (!key || !channel) {
    return res.status(400).json({
      result: "ERR",
      payload: { error: "Missing required fields" },
    });
  }

  try {
    // Find and update the user
    const updatedUser = await Users.findOneAndUpdate(
      { station_code },
      { key, channel },
      { new: true } // Return the modified document
    ).exec();

    // Handle case where user is not found
    if (!updatedUser) {
      return res.status(404).json({
        result: "ERR",
        payload: { error: "User not found" },
      });
    }

    // Return success response
    return res.json({
      result: "OK",
      payload: { user: updatedUser },
    });

  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({
      result: "ERR",
      payload: { error: "Internal Server Error" },
    });
  }



});
module.exports = router;
