require("./types/User")
require("./types/Thread")
require("./types/Comment")

require("./api")

const GQL = require.main.require("./lib/graphql-types")

const schema = GQL("Schema")({
  query: GQL("Query"),
  mutation: GQL("Mutation"),
})

module.exports = schema
