const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require("graphql")

const GQLTypes = require.main.require("./lib/GQLTypes")

const Thread = new GraphQLObjectType({
  name: "Thread",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },

    author: {
      type: GQLTypes("User"),
      resolve: () => {
        return {
          name: "bob",
          email: "bob@gmail.com",
        }
      },
    },

    rootComments: {
      type: GraphQLList(GQLTypes("Comment")),
      resolve: () => {
        return [{ content: "Sub Comment 1" }, { content: "Sub Comment 2" }]
      },
    },
  }),
})

GQLTypes.DefineType("Thread", Thread)
