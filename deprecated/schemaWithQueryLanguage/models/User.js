const type = `
  type User {
    id: Int!
    name: String
    email: String
    comments: [Comment]
  }

  extend type Query {
    user(id: Int!): User
    users: [User]
  }
`

const resolver = {
  User: {
    comments: (author, _, { knex }) =>
      knex("user")
        .select("*")
        .where({ id: author.id }),
  },
}

const queryResolvers = {
  users: (_, { id }, { knex }) => {
    return knex("user").select("*")
  },
  user: (_, { id }, { knex }) => {
    return knex("user")
      .select("*")
      .where({ id })
  },
}

const mutationResolvers = {}

module.exports = { type, resolver, queryResolvers, mutationResolvers }
