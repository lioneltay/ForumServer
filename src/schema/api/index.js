const { GraphQLObjectType } = require("graphql")

const R = require("ramda")

const GQLTypes = require.main.require("./lib/GQLTypes")

const basicAPI = require("./basicAPI")

const Query = new GraphQLObjectType({
  name: "Query",
  fields: () => R.mergeAll([basicAPI.queryFields]),
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => R.mergeAll([basicAPI.mutationFields]),
})

GQLTypes.DefineType("Query", Query)
GQLTypes.DefineType("Mutation", Mutation)
