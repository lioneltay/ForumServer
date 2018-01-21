const { makeExecutableSchema } = require("graphql-tools")
const { combineModels } = require("./helpers")

const Models = [
  require("./root/auth"),
  require("./models/User"),
  require("./models/Post"),
]

const { typeDefs, resolvers } = combineModels(Models)

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema
