const http = require("http")
const express = require("express")
const mongoose = require("mongoose")

const app = express()

const ApiRouter = require("./src/routes/api")

app.use(express.json())

app.use("/api/test", ApiRouter.TestRoute)
app.use("/api/user", ApiRouter.UserRoute)

app.all("*", (req, res) => {
  res.status(404).json({
    result: "ERR",
    payload: {
      error: "Invalid path",
    },
  })
})

const server = http.createServer(app)

const initialize = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
  } catch (err) {
    console.log(err)
    process.exit()
  }

  console.log("Successfully Connected to MongoDB Server")

  server.listen(process.env.SERVER_PORT, undefined, undefined, (err) => {
    if (err) {
      console.log("Failed to start server")
      process.exit()
    }

    console.log(`Server listening on port ${process.env.SERVER_PORT}`)
  })
}

initialize()
