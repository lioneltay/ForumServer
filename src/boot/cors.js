const cors = require("cors")

module.exports = app => {
  app.use(
    cors({
      origin: [/http(s|):\/\/localhost:8080.*/],
      credentials: true,
    })
  )
}
