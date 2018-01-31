const R = require("ramda")
const { makeExecutableSchema } = require("graphql-tools")
const joinMonsterAdapter = require("join-monster-graphql-tools-adapter")

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

const Models = [
  require("./api/basicApi"),
  require("./api/auth"),

  require("./types/User"),
  require("./types/Comment"),
  require("./types/CommentLike"),
  require("./types/Thread"),
  require("./types/ThreadLike"),
  require("./types/Follow"),
]

const { typeDefs, resolvers } = combineModels(Models)

const jmAnnotations = Models.map(R.prop("jmAnnotations"))
  .filter(Boolean)
  .reduce((a, v) => R.mergeDeepLeft(a, v), {})

console.log(jmAnnotations)

const schema = makeExecutableSchema({ typeDefs, resolvers })

// module.exports = schema
joinMonsterAdapter(schema, jmAnnotations)

module.exports = schema
