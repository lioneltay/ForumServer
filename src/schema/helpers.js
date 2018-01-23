const R = require("ramda")

const notNil = R.complement(R.isNil)

const combineModels = Models => {
  const types = Models.map(R.prop("type")).filter(notNil)
  const qResolvers = Models.map(R.prop("queryResolvers")).filter(notNil)
  const mResolvers = Models.map(R.prop("mutationResolvers")).filter(notNil)
  const modelResolvers = Models.map(R.prop("resolver")).filter(notNil)

  const typeDefs = [
    ...types,
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
    Query: R.mergeAll(qResolvers),
  }

  const MutationResolvers = {
    Mutation: R.mergeAll(mResolvers),
  }

  const resolvers = R.mergeAll([
    ...modelResolvers,
    QueryResolvers,
    MutationResolvers,
  ])

  return { typeDefs, resolvers }
}

module.exports = { combineModels }
