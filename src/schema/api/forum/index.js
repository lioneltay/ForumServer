const GQL = require.main.require("./lib/graphql-types")

const R = require("ramda")

const GQLTypes = require.main.require("./lib/graphql-types")

const apis = [
  require("./basicAPI"),
  require("./auth"),
  require("./thread-crud"),
  require("./comment-crud"),
  require("./like-crud"),
]

const Query = GQL("Object")({
  name: "Query",
  fields: () => R.mergeAll(apis.map(R.prop("queryFields"))),
})

const Mutation = GQL("Object")({
  name: "Mutation",
  fields: () => R.mergeAll(apis.map(R.prop("mutationFields"))),
})

GQLTypes.DefineType("Query", Query)
GQLTypes.DefineType("Mutation", Mutation)
