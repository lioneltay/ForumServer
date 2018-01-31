const joinMonster = require.main.require("./lib/join-monster")
const GQL = require.main.require("./lib/graphql-types")

const mutationFields = {
  createComment: {
    type: GQL("Comment"),
    args: {
      user_id: { type: GQL("NonNull")(GQL("ID")) },
      thread_id: { type: GQL("NonNull")(GQL("ID")) },
      comment_id: { type: GQL("ID") },
      title: { type: GQL("String") },
      content: { type: GQL("String") },
    },
    where: (table, args, { knex, commend_id }) => {
      return knex.raw(`${table}.id = ?`, commend_id).toString()
    },
    resolve: (
      parentValue,
      { user_id, thread_id, comment_id, title, content },
      { knex },
      resolveInfo
    ) => {
      return knex("comment")
        .insert({ user_id, thread_id, comment_id, title, content })
        .then(comment_id => joinMonster(resolveInfo, { knex, comment_id }))
    },
  },

  updateComment: {
    type: GQL("Comment"),
    args: {
      comment_id: { type: GQL("NonNull")(GQL("ID")) },
      title: { type: GQL("String") },
      content: { type: GQL("String") },
    },
    where: (table, args, { knex }) => {
      return knex.raw(`${table}.id = ?`, args.comment_id).toString()
    },
    resolve: (
      parentValue,
      { comment_id, title, content },
      { knex },
      resolveInfo
    ) => {
      return knex("comment")
        .where({ id: comment_id })
        .update({ title, content })
        .then(() => joinMonster(resolveInfo, { knex }))
    },
  },

  archiveComment: {
    type: GQL("Comment"),
    args: { comment_id: { type: GQL("NonNull")(GQL("ID")) } },
    where: (table, args, { knex }) => {
      return knex.raw(`${table}.id = ?`, args.comment_id).toString()
    },
    resolve: (parentValue, { comment_id }, { knex }, resolveInfo) => {
      return knex("comment")
        .where({ id: comment_id })
        .update({ archived: true })
        .then(() => joinMonster(resolveInfo, { knex }))
    },
  },
}

module.exports = { mutationFields }
