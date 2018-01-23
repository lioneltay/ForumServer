const R = require("ramda")

const type = `
  type Comment {
    id: Int!
    content: String
    author: User
    votes: Int
    subComments: [Comment]
  }

  extend type Query {
    comments: [Comment]
  }
`

const resolver = {
  Comment: {
    author: (comment, _, { knex }) => {
      return knex("user")
        .select("*")
        .where({ id: comment.user_id })
        .then(R.head)
    },
    subComments: (comment, _, { knex }) => {
      return knex("comment")
        .select("*")
        .where({ comment_id: comment.id })
    },
  },
}

const queryResolvers = {
  comments: (_, args, { knex }) => knex("comment").select("*"),
}

module.exports = { type, resolver, queryResolvers }
