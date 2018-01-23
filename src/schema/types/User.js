const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require("graphql")

const GQLTypes = require.main.require("./lib/GQLTypes")

const User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },

    comments: {
      type: GraphQLList(GQLTypes("Comment")),
      resolve: () => {
        return []
      },
    },

    threads: {
      type: GraphQLList(GQLTypes("Thread")),
      resolve: () => {
        return [
          {
            id: 1,
            content: "Cool Things Comment",
          },
        ]
      },
    },
  }),
})

GQLTypes.DefineType("User", User)
