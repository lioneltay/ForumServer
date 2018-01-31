const GQL = require.main.require("./lib/graphql-types")

const Thread = GQL("Object")({
  name: "Thread",
  sqlTable: "thread",
  uniqueKey: "id",
  fields: () => ({
    id: { type: GQL("ID") },
    created_at: { type: GQL("String") },
    title: { type: GQL("String") },
    content: { type: GQL("String") },
    archived: { type: GQL("Boolean") },

    likeCount: {
      type: GQL("Int"),
      sqlExpr: threadTable =>
        `(SELECT count(*) FROM thread_like where thread_like.thread_id = ${threadTable}.id)`,
    },

    likes: {
      type: GQL("List")(GQL("ThreadLike")),
      sqlJoin: (threadTable, likeTable) =>
        `${threadTable}.id = ${likeTable}.thread_id`,
    },

    author: {
      type: GQL("User"),
      sqlJoin: (threadTable, userTable) =>
        `${threadTable}.user_id = ${userTable}.id`,
    },

    rootComments: {
      type: GQL("List")(GQL("Comment")),
      args: {
        cow: { type: GQL("String") },
      },
      where: (table, args, { knex }) => {
        return knex.raw(`${table}.comment_id is null`).toString()
      },
      sqlJoin: (threadTable, commentTable) =>
        `${threadTable}.id = ${commentTable}.thread_id`,
    },
  }),
})

GQL.DefineType("Thread", Thread)
