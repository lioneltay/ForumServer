const cookieSession = require("cookie-session")

module.exports = app => {
  app.use(
    cookieSession({
      secret: "my_secret",
      name: "TheCookie",
    })
  )
}
