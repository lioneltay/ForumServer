const express = require("express")

const app = express()

require("./boot/cors")(app)
require("./boot/cookie")(app)
require("./boot/auth")(app)
require("./boot/graphql")(app)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
