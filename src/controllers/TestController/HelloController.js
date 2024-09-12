const HelloController = async (req, res) => {
  const { name } = req.body

  if (!name)
    return res.status(400).json({
      result: "ERR",
      payload: { error: "Missing required fields" },
    })

  res.status(200).json({
    result: "OK",
    payload: {
      greeting: `Hello ${name}`,
    },
  })
}

module.exports = HelloController
