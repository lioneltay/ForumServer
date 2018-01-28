const GQL = require.main.require("./lib/graphql-types")
const joinMonster = require.main.require("./lib/join-monster")

const queryFields = {
  users: {
    type: GQL("List")(GQL("User")),
    resolve: (parentValue, args, context, resolveInfo) =>
      joinMonster(resolveInfo, {}),
  },

  user: {
    type: GQL("User"),
    args: {
      id: { type: GQL("ID") },
    },
    where: (table, args, { knex }) => {
      return knex.raw(`${table}.id = ?`, args.id).toString()
    },
    resolve: (parentValue, args, { knex }, resolveInfo) =>
      joinMonster(resolveInfo, { knex }),
  },

  threads: {
    type: GQL("List")(GQL("Thread")),
    resolve: (parentValue, args, context, resolveInfo) =>
      joinMonster(resolveInfo, {}),
  },

  thread: {
    type: GQL("Thread"),
    args: {
      id: { type: GQL("ID") },
    },
    where: (table, args, { knex }) =>
      knex.raw(`${table}.id = ?`, args.id).toString(),
    resolve: (parentValue, args, { knex }, resolveInfo) =>
      joinMonster(resolveInfo, { knex }),
  },

  comments: {
    type: GQL("List")(GQL("Comment")),
    resolve: (parentValue, args, context, resolveInfo) =>
      joinMonster(resolveInfo, {}),
  },

  comment: {
    type: GQL("Comment"),
    args: {
      id: { type: GQL("ID") },
    },
    where: (table, args, { knex }) =>
      knex.raw(`${table}.id = ?`, args.id).toString(),
    resolve: (parentValue, args, { knex }, resolveInfo) =>
      joinMonster(resolveInfo, { knex }),
  },
}

const mutationFields = {
  testMutation: {
    type: GQL("String"),
    resolve: () => `Hello World`,
  },
}

module.exports = { queryFields, mutationFields }
