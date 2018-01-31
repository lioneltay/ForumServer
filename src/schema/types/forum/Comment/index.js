const requireGraphql = require.main.require("./lib/require-graphql")

const type = requireGraphql(module, "./type")

const jmAnnotations = {
  Comment: {
    sqlTable: "comment",
    uniqueKey: "id",
    fields: {
      created_at: { sqlColumn: "created_at" },

      likeCount: {
        sqlExpr: likeTable =>
          `(SELECT count(*) FROM comment_like where comment_id = ${likeTable}.id)`,
      },

      likes: {
        sqlJoin: (commentTable, likeTable) =>
          `${commentTable}.id = ${likeTable}.comment_id`,
      },

      author: {
        sqlJoin: (commentTable, userTable) =>
          `${commentTable}.user_id = ${userTable}.id`,
      },

      thread: {
        sqlJoin: (commentTable, threadTable) =>
          `${commentTable}.thread_id = ${threadTable}.id`,
      },

      subComments: {
        sqlJoin: (commentTable, commentTable2) =>
          `${commentTable}.id = ${commentTable2}.comment_id`,
      },
    },
  },
}

const resolver = {
  // Join monster does most of the work
}

module.exports = {
  type,
  jmAnnotations,
  resolver,
}
