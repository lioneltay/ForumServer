const GQL = require.main.require("./lib/graphql-types")

const Comment = GQL("Object")({
  name: "Comment",
  sqlTable: "comment",
  uniqueKey: "id",
  fields: () => ({
    id: { type: GQL("ID") },
    content: { type: GQL("String") },

    likeCount: {
      type: GQL("Int"),
      description: "The number of likes on this comment",
      sqlExpr: likeTable =>
        `(SELECT count(*) FROM comment_like where comment_id = ${likeTable}.id)`,
    },

    likes: {
      type: GQL("List")(GQL("CommentLike")),
      sqlJoin: (commentTable, likeTable) =>
        `${commentTable}.id = ${likeTable}.comment_id`,
    },

    author: {
      type: GQL("User"),
      sqlJoin: (commentTable, userTable) =>
        `${commentTable}.user_id = ${userTable}.id`,
    },

    thread: {
      type: GQL("Thread"),
      sqlJoin: (commentTable, threadTable) =>
        `${commentTable}.thread_id = ${threadTable}.id`,
    },

    subComments: {
      type: GQL("List")(GQL("Comment")),
      sqlJoin: (commentTable, commentTable2) =>
        `${commentTable}.id = ${commentTable2}.comment_id`,
      // sqlBatch: {
      //   thisKey: "comment_id",
      //   parentKey: "id",
      // },
    },
  }),
})

GQL.DefineType("Comment", Comment)
