  const ProfileController = async (req, res) => {
    return res.status(200).json({
      result: "OK",
      payload: {
        user: {
        "station_code": "1234",
        "key": "01",
        "channel": "A1"
        },
      },
    });
  };

const RegisterController = async (req, res) => {
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

    const newUser = { station_code, key, channel, roles: ["SensorDevice"] };
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

module.exports = { ProfileController, RegisterController,};