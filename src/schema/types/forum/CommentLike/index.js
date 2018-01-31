const requireGraphql = require.main.require("./lib/require-graphql")

const type = requireGraphql(module, "./type")

const jmAnnotations = {
  CommentLike: {
    sqlTable: "comment_like",
    uniqueKey: ["user_id", "comment_id"],
    fields: {
      comment: {
        sqlJoin: (likeTable, commentTable) =>
          `${likeTable}.comment_id = ${commentTable}.id`,
      },
    },
  },
}

const resolver = {}

module.exports = { jmAnnotations, type, resolver }
