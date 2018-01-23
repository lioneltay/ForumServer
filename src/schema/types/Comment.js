const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require("graphql")

const GQLTypes = require.main.require("./lib/GQLTypes")

const Comment = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLID },
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

    thread: {
      type: GQLTypes("Thread"),
      resolve: () => {
        return {
          id: 1,
          title: "The Best Thread",
          content: "some good content here",
        }
      },
    },

    subComments: {
      type: GraphQLList(GQLTypes("Comment")),
      resolve: () => {
        return [{ content: "Sub Comment 1" }, { content: "Sub Comment 2" }]
      },
    },
  }),
})

GQLTypes.DefineType("Comment", Comment)
