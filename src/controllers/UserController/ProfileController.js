const ProfileController = async (req, res) => {
  return res.status(200).json({
    result: "OK",
    payload: {
      user: {
        name: "John Doe",
        age: 20,
        email: "john.doe@email.com",
      },
    },
  })
}

module.exports = ProfileController
