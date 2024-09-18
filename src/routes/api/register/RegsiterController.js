const Users = require("../../../models/Users");


router.post("/register", async (req, res) => {
  console.log("Received body:", req.body);  // Log the request body

  const { station_code, key, channel } = req.body;

  if (!station_code || !key || !channel) {
    console.log("Missing required fields:", { station_code, key, channel });  // Log missing fields
    return res.status(400).json({
      result: "ERR",
      payload: { error: "Missing required fields" },
    });
  }

  try {
    const findStation = await Users.findOne({ station_code }).exec();

    if (findStation) {
      console.log("Station code already taken");
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
    console.error("Error occurred:", err);

    return res.status(500).json({
      result: "ERR",
      payload: { error: "Internal Server Error" },
    });
  }
});
module.exports = router;
