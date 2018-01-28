const graphqlHTTP = require("express-graphql")
const schema = require("../schema")
const knex = require("knex")(require("../knexfile"))

module.exports = app => {
  app.use(
    "/graphql",
    graphqlHTTP((req, res, query) => {
      const startTime = Date.now()

      return {
        schema,
        graphiql: true,
        formatError: require.main.require("./lib/graphql-custom-errors"),
        extensions: ({ document, variables, operationName, result }) => {
          return {
            runTime: Date.now() - startTime,
          }
        },
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
