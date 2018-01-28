const GQL = require.main.require("./lib/graphql-types")

const User = GQL("Object")({
  name: "User",
  sqlTable: "user",
  uniqueKey: "id",
  fields: () => ({
    id: { type: GQL("ID") },
    first_name: { type: GQL("String") },
    last_name: { type: GQL("String") },

    full_name: {
      type: GQL("String"),
      sqlDeps: ["first_name", "last_name"],
      resolve: ({ first_name, last_name }) =>
        [first_name, last_name].filter(Boolean).join(" "),
    },

    email: { type: GQL("String") },
    created_at: { type: GQL("String") },

    comments: {
      type: GQL("List")(GQL("Comment")),
      sqlJoin: (userTable, commentTable) =>
        `${userTable}.id= ${commentTable}.user_id`,
    },

    threads: {
      type: GQL("List")(GQL("Thread")),
      sqlJoin: (userTable, threadTable) =>
        `${userTable}.id = ${threadTable}.user_id`,
    },

    follows: {
      type: GQL("List")(GQL("Follow")),
      args: {
        type: {
          type: GQL("Enum")({
            name: "FollowerType",
            values: {
              ALL: { value: "all" },
              FOLLOWER: { value: "follower" },
              FOLLOWEE: { value: "followee" },
            },
          }),
        },
      },
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
      type: GQL("List")(GQL("Follow")),
      sqlJoin: (userTable, followTable) =>
        `${userTable}.id = ${followTable}.followee_id`,
    },

    followees: {
      type: GQL("List")(GQL("Follow")),
      sqlJoin: (userTable, followTable) =>
        `${userTable}.id = ${followTable}.follower_id`,
    },
  }),
})

GQL.DefineType("User", User)
