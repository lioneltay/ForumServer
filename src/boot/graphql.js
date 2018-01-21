const graphqlHTTP = require("express-graphql")

const schema = require("../schema")

const knex = require("knex")(require("../knexfile"))

module.exports = app => {
  app.use(
    "/graphql",
    graphqlHTTP((req, res, query) => {
      return {
        schema,
        graphiql: true,
        context: {
          req,
          res,
          query,
          knex,
          user: req.user,
          session: req.session,
        },
      }
    })
  )
}
