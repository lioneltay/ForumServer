const joinMonster = require.main.require("./lib/join-monster")
const requireGraphql = require.main.require("./lib/require-graphql")

const type = requireGraphql(module, "./type")

const jmAnnotations = {
  Query: {
    fields: {
      user: {
        where: (table, args, { knex }) => {
          return knex.raw(`${table}.id = ?`, args.id).toString()
        },
      },
      thread: {
        where: (table, args, { knex }) => {
          console.log("sfkgjskdfg", args.id)
          return knex.raw(`${table}.id = ?`, args.id).toString()
        },
      },
      comment: {
        where: (table, args, { knex }) =>
          knex.raw(`${table}.id = ?`, args.id).toString(),
      },
    },
  },
}

const queryResolvers = {
  users: {
    resolve: (parentValue, args, context, resolveInfo) =>
      joinMonster(resolveInfo),
  },

  user: {
    resolve: (parentValue, args, context, resolveInfo) =>
      joinMonster(resolveInfo),
  },

  threads: {
    resolve: (parentValue, args, context, resolveInfo) =>
      joinMonster(resolveInfo),
  },

  thread: {
    resolve: (parentValue, args, context, resolveInfo) =>
      joinMonster(resolveInfo),
  },

  comments: {
    resolve: (parentValue, args, context, resolveInfo) =>
      joinMonster(resolveInfo),
  },

  comment: {
    resolve: (parentValue, args, context, resolveInfo) =>
      joinMonster(resolveInfo),
  },
}

const mutationResolvers = {
  testMutation: {
    resolve: () => `Hello World`,
  },
}

module.exports = { type, queryResolvers, mutationResolvers, jmAnnotations }
