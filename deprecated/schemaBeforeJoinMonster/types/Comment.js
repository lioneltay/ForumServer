const GQL = require.main.require("./lib/graphql-types")

const Comment = GQL("Object")({
  name: "Comment",
  fields: () => ({
    id: { type: GQL("ID") },
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

    thread: {
      type: GQL("Thread"),
      resolve: () => {
        return {
          id: 1,
          title: "The Best Thread",
          content: "some good content here",
        }
      },
    },

    subComments: {
      type: GQL("List")(GQL("Comment")),
      resolve: () => {
        return [{ content: "Sub Comment 1" }, { content: "Sub Comment 2" }]
      },
    },
  }),
})

GQL.DefineType("Comment", Comment)
