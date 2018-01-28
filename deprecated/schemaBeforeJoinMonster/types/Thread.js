const GQL = require.main.require("./lib/graphql-types")

const Thread = GQL("Object")({
  name: "Thread",
  fields: () => ({
    id: { type: GQL("ID") },
    title: { type: GQL("String") },
    content: { type: GQL("String") },

    author: {
      type: GQL("User"),
      resolve: () => {
        return {
          name: "bob",
          email: "bob@gmail.com",
        }
      },
    },

    rootComments: {
      type: GQL("List")(GQL("Comment")),
      resolve: () => {
        return [{ content: "Sub Comment 1" }, { content: "Sub Comment 2" }]
      },
    },
  }),
})

GQL.DefineType("Thread", Thread)
