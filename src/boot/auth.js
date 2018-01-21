const knex = require.main.require("./utils/knex")

module.exports = app => {
  app.use((req, res, next) => {
    console.log(req.session)
    // req.session.user_id = 1
    const user_id = req.session.user_id
    if (user_id) {
      knex.raw(`select * from user where id = ?`, [user_id]).then(res => {
        req.user = res[0][0]
        next()
      })
    } else {
      next()
    }
  })

  app.use((req, res, next) => {
    console.log("@@USER: ", req.user)
    next()
  })
}
