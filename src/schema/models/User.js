const type = `
  type User {
    id: Int!
    name: String
    email: String
    posts: [Post]
  }

  extend type Query {
    user(id: Int!): User
    users: [User]
  }
`

const resolver = {
  User: {
    posts: (author, _, { knex }) =>
      knex
        .raw(`select * from post where user_id = ?`, [author.id])
        .then(result => result[0]),
  },
}

const queryResolvers = {
  users: (_, { id }, { knex }) => {
    return knex("user").select("*")
  },
  user: (_, { id }, { knex }) => {
    return knex
      .raw(`select * from user where id = ?`, [id])
      .then(result => result[0][0])
  },
}

const mutationResolvers = {}

module.exports = { type, resolver, queryResolvers, mutationResolvers }
