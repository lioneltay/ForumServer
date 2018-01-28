const GQL = require.main.require("./lib/graphql-types")

const User = GQL("Object")({
  name: "User",
  sqlTable: "user",
  uniqueKey: "id",
  fields: () => ({
    id: {
      sqlColumn: "id",
      type: GQL("ID"),
    },
    name: {
      sqlColumn: "name",
      type: GQL("String"),
    },
    email: {
      sqlColumn: "email",
      type: GQL("String"),
    },

    // comments: {
    //   type: GQL("List")(GQL("Comment")),
    //   sqlJoin: (userTable, commentTable) =>
    //     `${userTable.id} = ${commentTable}.user_id`,
    // },

    // threads: {
    //   type: GQL("List")(GQL("Thread")),
    //   sqlJoin: (userTable, threadTable) =>
    //     `${userTable.id} = ${threadTable}.user_id`,
    // },
  }),
})

GQL.DefineType("User", User)
