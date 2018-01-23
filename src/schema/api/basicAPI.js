const { GraphQLList, GraphQLString, GraphQLID } = require("graphql")

const R = require("ramda")

const GQLTypes = require.main.require("./lib/GQLTypes")

const queryFields = {
  users: {
    type: GraphQLList(GQLTypes("User")),
    resolve: (parentValue, args, { knex }) => {
      return knex("user").select("*")
    },
  },

  user: {
    type: GQLTypes("User"),
    args: {
      id: { type: GraphQLID },
    },
    resolve: (parentValue, { id }, { knex }) => {
      return knex("user")
        .select("*")
        .where({ id })
        .then(R.head)
    },
  },

  threads: {
    type: GraphQLList(GQLTypes("Thread")),
    resolve: (parentValue, args, { knex }) => {
      return knex("thread").select("*")
    },
  },

  thread: {
    type: GQLTypes("Thread"),
    args: {
      id: { type: GraphQLID },
    },
    resolve: (parentValue, { id }, { knex }) => {
      return knex("thread")
        .select("*")
        .where({ id })
        .then(R.head)
    },
  },

  comments: {
    type: GraphQLList(GQLTypes("Comment")),
    resolve: (parentValue, args, { knex }) => {
      return knex("comment").select("*")
    },
  },

  comment: {
    type: GQLTypes("Comment"),
    args: {
      id: { type: GraphQLID },
    },
    resolve: (parentValue, { id }, { knex }) => {
      return knex("comment")
        .select("*")
        .where({ id })
        .then(R.head)
    },
  },
}

const mutationFields = {
  testMutation: {
    type: GraphQLString,
    resolve: () => `Hello World`,
  },
}

module.exports = { queryFields, mutationFields }
