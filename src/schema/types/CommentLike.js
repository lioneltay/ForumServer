const GQL = require.main.require("./lib/graphql-types")

const CommentLike = GQL("Object")({
  name: "CommentLike",
  sqlTable: "comment_like",
  uniqueKey: ["user_id", "comment_id"],
  fields: {
    user_id: { type: GQL("ID") },
    comment_id: { type: GQL("ID") },

    comment: {
      type: GQL("Comment"),
      sqlJoin: (likeTable, commentTable) =>
        `${likeTable}.comment_id = ${commentTable}.id`,
    },
  },
})

GQL.DefineType("CommentLike", CommentLike)
