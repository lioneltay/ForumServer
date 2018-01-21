const R = require("ramda")

const combineModels = Models => {
  const typeDefs = [
    ...Models.map(R.prop("type")),
    `
  type Query {
    nothing: Int
  }

  type Mutation {
    nothing: Int
  }
  `,
  ]

  const QueryResolvers = {
    Query: R.mergeAll(Models.map(R.prop("queryResolvers"))),
  }

  const MutationResolvers = {
    Mutation: R.mergeAll(Models.map(R.prop("mutationResolvers"))),
  }

  const resolvers = R.mergeAll([
    ...Models.map(R.prop("resolver")),
    QueryResolvers,
    MutationResolvers,
  ])

  return { typeDefs, resolvers }
}

module.exports = {
  combineModels,
}
