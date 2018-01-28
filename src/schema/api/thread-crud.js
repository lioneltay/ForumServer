const joinMonster = require.main.require("./lib/join-monster")
const GQL = require.main.require("./lib/graphql-types")

const mutationFields = {
  createThread: {
    type: GQL("Thread"),
    args: {
      title: { type: GQL("String") },
      content: { type: GQL("String") },
    },
    where: (table, args, { knex, thread_id }) => {
      return knex.raw(`${table}.id = ?`, thread_id).toString()
    },
    resolve: (parentValue, { title, content }, { knex }, resolveInfo) => {
      return knex("thread")
        .insert({ title, content })
        .then(thread_id => joinMonster(resolveInfo, { knex, thread_id }))
    },
  },

  updateThread: {
    type: GQL("Thread"),
    args: {
      id: { type: GQL("NonNull")(GQL("ID")) },
      title: { type: GQL("String") },
      content: { type: GQL("String") },
    },
    where: (table, args, { knex }) => {
      return knex.raw(`${table}.id = ?`, args.id).toString()
    },
    resolve: (parentValue, { id, title, content }, { knex }, resolveInfo) => {
      return knex("thread")
        .where({ id })
        .update({ title, content })
        .then(() => joinMonster(resolveInfo, { knex }))
    },
  },

  archiveThread: {
    type: GQL("Thread"),
    args: { thread_id: { type: GQL("NonNull")(GQL("ID")) } },
    where: (table, args, { knex }) => {
      return knex.raw(`${table}.id = ?`, args.thread_id).toString()
    },
    resolve: (parentValue, { thread_id }, { knex }, resolveInfo) => {
      return knex("thread")
        .where({ id: thread_id })
        .update({ archived: true })
        .then(() => joinMonster(resolveInfo, { knex }))
    },
  },
}

module.exports = { mutationFields }
