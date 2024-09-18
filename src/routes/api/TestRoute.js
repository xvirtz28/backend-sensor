const router = require("express").Router();
const HelloController = require("../../controllers/HelloController");

// Path /api/test/hello
router.post("/hello", HelloController.HelloController);

router.all("*", (req, res) => {
  return res.status(404).json({
    result: "ERR",
    payload: {
      error: "Invalid /test path",
    },
  });
});

module.exports = router;
