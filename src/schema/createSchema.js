const R = require("ramda")
const { makeExecutableSchema } = require("graphql-tools")
const joinMonsterAdapter = require("join-monster-graphql-tools-adapter")

const truthyOnly = R.filter(Boolean)
const mergeDeepAll = R.reduce(R.mergeDeepLeft, {})
const mergeDeepAllTruthy = R.pipe(truthyOnly, mergeDeepAll)

module.exports = Models => {
  const schema = makeExecutableSchema({
    typeDefs: Models.map(R.prop("type"))
      .filter(Boolean)
      .concat(`type Query { nothing: Int } type Mutation { nothing: Int }`),
    resolvers: mergeDeepAllTruthy(Models.map(R.prop("resolver"))),
  })

  joinMonsterAdapter(
    schema,
    mergeDeepAllTruthy(Models.map(R.prop("jmAnnotations")))
  )

  return schema
}
