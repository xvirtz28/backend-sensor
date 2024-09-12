const router = require("express").Router()

const TestController = require("../../controllers/TestController")

//Path /api/test/hello
router.post("/hello", TestController.HelloController)

router.all("*", (req, res) => {
  return res.status(404).json({
    result: "ERR",
    payload: {
      error: "Invalid /test path",
    },
  })
})

module.exports = router
