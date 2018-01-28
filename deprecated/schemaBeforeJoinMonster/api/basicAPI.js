const R = require("ramda")
const GQL = require.main.require("./lib/graphql-types")
const joinMonster = require.main.require("./lib/join-monster")

const queryFields = {
  users: {
    type: GQL("List")(GQL("User")),
    resolve: (parentValue, args, { knex }, resolveInfo) => {
      return knex("user").select("*")
      // return joinMonster(
      //   resolveInfo,
      //   {},
      //   sql => {
      //     console.log(sql)
      //     return knex.raw(sql).then(x => x[0])
      //   },
      //   { dialect: "mysql" }
      // )
    },
  },

  user: {
    type: GQL("User"),
    args: {
      id: { type: GQL("ID") },
    },
    resolve: (parentValue, { id }, { knex }, resolveInfo) => {
      return knex("user")
        .select("*")
        .where({ id })
        .then(R.head)
    },
  },

  threads: {
    type: GQL("List")(GQL("Thread")),
    resolve: (parentValue, args, { knex }) => {
      return knex("thread").select("*")
    },
  },

  thread: {
    type: GQL("Thread"),
    args: {
      id: { type: GQL("ID") },
    },
    resolve: (parentValue, { id }, { knex }) => {
      return knex("thread")
        .select("*")
        .where({ id })
        .then(R.head)
    },
  },

  comments: {
    type: GQL("List")(GQL("Comment")),
    resolve: (parentValue, args, { knex }) => {
      return knex("comment").select("*")
    },
  },

  comment: {
    type: GQL("Comment"),
    args: {
      id: { type: GQL("ID") },
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
    type: GQL("String"),
    resolve: () => `Hello World`,
  },
}

module.exports = { queryFields, mutationFields }
