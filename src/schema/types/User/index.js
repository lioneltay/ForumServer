const requireGraphql = require.main.require("./lib/require-graphql")

const type = requireGraphql(module, "./type")

const jmAnnotations = {
  User: {
    sqlTable: "user",
    uniqueKey: "id",
    fields: {
      firstName: { sqlColumn: "first_name" },
      lastName: { sqlColumn: "last_name" },
      createdAt: { sqlColumn: "created_at" },

      fullName: {
        sqlDeps: ["first_name", "last_name"],
        resolve: ({ first_name, last_name }) =>
          [first_name, last_name].filter(Boolean).join(" "),
      },

      comments: {
        sqlJoin: (userTable, commentTable) =>
          `${userTable}.id= ${commentTable}.user_id`,
      },

      threads: {
        sqlJoin: (userTable, threadTable) =>
          `${userTable}.id = ${threadTable}.user_id`,
      },

      follows: {
        sqlTable: "follow",
        where: (followTable, { type = "all" }, context, astNode) => {
          const userTable = astNode.parent.as

          return type === "all"
            ? false
            : type === "follower"
              ? `${followTable}.followee_id = ${userTable}.id`
              : `${followTable}.follower_id = ${userTable}.id`
        },
        sqlJoin: (userTable, followTable) =>
          `${userTable}.id in (${followTable}.followee_id, ${followTable}.follower_id)`,
      },

      followers: {
        sqlJoin: (userTable, followTable) =>
          `${userTable}.id = ${followTable}.followee_id`,
      },

      followees: {
        sqlJoin: (userTable, followTable) =>
          `${userTable}.id = ${followTable}.follower_id`,
      },
    },
  },
}

const resolver = {}

module.exports = { resolver, type, jmAnnotations }
