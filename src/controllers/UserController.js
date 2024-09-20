const Users = require("../models/Users")

const ProfileController = async (req, res) => {
  const { station_code } = req.params;

  try {
    const user = await Users.findOne({ station_code }).exec();

    if (!user) {
      return res.status(404).json({
        result: "ERR",
        message: "User not found"
      });
    }

    return res.status(200).json({
      result: "OK",
      message: `Station Code: ${user.station_code}, Key: ${user.key}, Channel: ${user.channel}`
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return res.status(500).json({
      result: "ERR",
      message: "Internal Server Error"
    });
  }
};
const RegisterController = async (req, res) => {
  const { station_code, key, channel } = req.body;

  if (!station_code || !key || !channel) {
    return res.status(400).json({
      result: "ERR",
      message: "Missing required fields"
    });
  }

  try {
    const findStation = await Users.findOne({ station_code }).exec();
    if (findStation) {
      return res.status(400).json({
        result: "ERR",
        message: "Station code already taken"
      });
    }

    const newUser = { station_code, key, channel, roles: ["SensorDevice"] };
    await Users.create(newUser);

    return res.status(201).json({
      result: "OK",
      message: `Sensor created successfully with Station Code: ${newUser.station_code}`
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      result: "ERR",
      message: "Internal Server Error"
    });
  }
};

// const DeleteController = async (req, res) => {
//   const { station_code } = req.params;

//   try {
//     const result = await Users.findOneAndDelete({ station_code }).exec();

//     if (!result) {
//       return res.status(404).json({
//         result: "ERR",
//         payload: { error: "Sensor not found" },
//       });
//     }

//     return res.json({
//       result: "OK",
//       payload: { message: "Sensor deleted successfully" },
//     });

//   } catch (err) {
//     console.error("Error deleting sensor:", err);

//     return res.status(500).json({
//       result: "ERR",
//       payload: { error: "Internal Server Error" },
//     });
//   }
// };

module.exports = { ProfileController, RegisterController, };