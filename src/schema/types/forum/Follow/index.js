const requireGraphql = require.main.require("./lib/require-graphql")

const type = requireGraphql(module, "./type")

const jmAnnotation = {
  Follow: {
    sqlTable: "follow",
    uniqueKey: ["follower_id", "followee_id"],
    fields: {
      created_at: { sqlColumn: "created_at" },

      follower: {
        sqlJoin: (followTable, userTable) =>
          `${followTable}.follower_id = ${userTable}.id`,
      },

      followee: {
        sqlJoin: (followTable, userTable) =>
          `${followTable}.followee_id = ${userTable}.id`,
      },
    },
  },
}

const resolver = {}

module.exports = { type, resolver, jmAnnotation }
