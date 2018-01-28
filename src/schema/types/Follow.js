const GQL = require.main.require("./lib/graphql-types")

const Follow = GQL("Object")({
  name: "Follow",
  sqlTable: "follow",
  uniqueKey: ["follower_id", "followee_id"],
  fields: () => ({
    follower_id: { type: GQL("ID") },
    followee_id: { type: GQL("ID") },
    created_at: { type: GQL("String") },

    follower: {
      type: GQL("User"),
      sqlJoin: (followTable, userTable) =>
        `${followTable}.follower_id = ${userTable}.id`,
    },

    followee: {
      type: GQL("User"),
      sqlJoin: (followTable, userTable) =>
        `${followTable}.followee_id = ${userTable}.id`,
    },
  }),
})

GQL.DefineType("Follow", Follow)
