const requireGraphql = require.main.require("./lib/require-graphql")

const type = requireGraphql(module, "./type")

const jmAnnotations = {
  Thread: {
    name: "Thread",
    sqlTable: "thread",
    uniqueKey: "id",
    fields: {
      likeCount: {
        sqlExpr: threadTable =>
          `(SELECT count(*) FROM thread_like where thread_like.thread_id = ${threadTable}.id)`,
      },

      likes: {
        sqlJoin: (threadTable, likeTable) =>
          `${threadTable}.id = ${likeTable}.thread_id`,
      },

      author: {
        sqlJoin: (threadTable, userTable) =>
          `${threadTable}.user_id = ${userTable}.id`,
      },

      rootComments: {
        where: (table, args, { knex }) => {
          return knex.raw(`${table}.comment_id is null`).toString()
        },
        sqlJoin: (threadTable, commentTable) =>
          `${threadTable}.id = ${commentTable}.thread_id`,
      },
    },
  },
}

const resolver = {}

module.exports = { jmAnnotations, type, resolver }
