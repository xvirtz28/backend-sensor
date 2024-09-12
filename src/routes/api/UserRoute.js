const router = require("express").Router()

const UserController = require("../../controllers/UserController")
const Users = require("../../models/Users")

router.get("/profile", UserController.ProfileController)
router.post("/register", async (req, res) => {
  const { name, username, email } = req.body

  if (!name || !username || !email)
    return res.status(400).json({
      result: "ERR",
      payload: { error: "Missing required fields" },
    })

  try {
    var findUsername = await Users.findOne({
      username,
    }).exec()
  } catch (err) {
    console.log(err)

    return res.status(500).json({
      result: "ERR",
      payload: { error: "Internal Server Error" },
    })
  }

  if (findUsername)
    return res.status(400).json({
      result: "ERR",
      payload: {
        error: "Username taken",
      },
    })

  const newUser = {
    username,
    email,
    name,
    roles: ["user"],
  }

  try {
    await Users.create(newUser)
  } catch (err) {
    console.log(err)

    return res.status(500).json({
      result: "ERR",
      payload: { error: "Internal Server Error" },
    })
  }

  return res.json({
    result: "OK",
    payload: { user: newUser },
  })
})

module.exports = router
