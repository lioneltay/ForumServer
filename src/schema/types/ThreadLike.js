const GQL = require.main.require("./lib/graphql-types")

const ThreadLike = GQL("Object")({
  name: "ThreadLike",
  sqlTable: "thread_like",
  uniqueKey: ["user_id", "thread_id"],
  fields: {
    user_id: { type: GQL("ID") },
    thread_id: { type: GQL("ID") },

    thread: {
      type: GQL("Thread"),
      sqlJoin: (likeTable, threadTable) =>
        `${likeTable}.thread_id = ${threadTable}.id`,
    },
  },
})

GQL.DefineType("ThreadLike", ThreadLike)
