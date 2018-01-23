const { GraphQLSchema } = require("graphql")

require("./types/User")
require("./types/Thread")
require("./types/Comment")

require("./api")

const GQLTypes = require.main.require("./lib/GQLTypes")

const schema = new GraphQLSchema({
  query: GQLTypes("Query"),
  mutation: GQLTypes("Mutation"),
})

module.exports = schema
