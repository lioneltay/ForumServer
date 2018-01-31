const requireGraphql = require.main.require("./lib/require-graphql")

const type = requireGraphql(module, "./type")

const jmAnnotations = {
  ThreadLike: {
    sqlTable: "thread_like",
    uniqueKey: ["user_id", "thread_id"],
    fields: {
      thread: {
        sqlJoin: (likeTable, threadTable) =>
          `${likeTable}.thread_id = ${threadTable}.id`,
      },
    },
  },
}

const resolver = {}

module.exports = { resolver, type, jmAnnotations }
