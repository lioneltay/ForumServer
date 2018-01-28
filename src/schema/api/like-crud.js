const GQL = require.main.require("./lib/graphql-types")
const joinMonster = require.main.require("./lib/join-monster")

const mutationFields = {
  likeThread: {
    type: GQL("Thread"),
    args: {
      user_id: { type: GQL("NonNull")(GQL("ID")) },
      thread_id: { type: GQL("NonNull")(GQL("ID")) },
    },
    where: (table, args, { knex }) => {
      return knex.raw(`${table}.id = ?`, args.thread_id).toString()
    },
    resolve: (parentValue, { user_id, thread_id }, { knex }, resolveInfo) => {
      return knex("thread_like")
        .insert({ user_id, thread_id })
        .then(() => joinMonster(resolveInfo, { knex }))
    },
  },

  unlikeThread: {
    type: GQL("Thread"),
    args: {
      user_id: { type: GQL("NonNull")(GQL("ID")) },
      thread_id: { type: GQL("NonNull")(GQL("ID")) },
    },
    where: (table, args, { knex }) => {
      return knex.raw(`${table}.id = ?`, args.thread_id).toString()
    },
    resolve: (parentValue, { user_id, thread_id }, { knex }, resolveInfo) => {
      return knex("thread_like")
        .where({ user_id, thread_id })
        .delete()
        .then(() => joinMonster(resolveInfo, { knex }))
    },
  },

  likeComment: {
    type: GQL("Comment"),
    args: {
      user_id: { type: GQL("NonNull")(GQL("ID")) },
      comment_id: { type: GQL("NonNull")(GQL("ID")) },
    },
    where: (table, args, { knex }) => {
      return knex.raw(`${table}.id = ?`, args.comment_id).toString()
    },
    resolve: (parentValue, { user_id, comment_id }, { knex }, resolveInfo) => {
      return knex("comment_like")
        .insert({ user_id, comment_id })
        .then(() => joinMonster(resolveInfo, { knex }))
    },
  },

  unlikeComment: {
    type: GQL("Comment"),
    args: {
      user_id: { type: GQL("NonNull")(GQL("ID")) },
      comment_id: { type: GQL("NonNull")(GQL("ID")) },
    },
    where: (table, args, { knex }) => {
      return knex.raw(`${table}.id = ?`, args.comment_id).toString()
    },
    resolve: (parentValue, { user_id, comment_id }, { knex }, resolveInfo) => {
      return knex("comment_like")
        .where({ user_id, comment_id })
        .delete()
        .then(() => joinMonster(resolveInfo, { knex }))
    },
  },
}

module.exports = { mutationFields }
