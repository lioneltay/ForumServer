const R = require("ramda")

const type = `
  type Thread {
    id: Int!
    author: User
    rootComments: [Comment]
    title: String
    content: String
  }

  extend type Query {
    threads: [Thread]
  }
`

const resolver = {
  Thread: {
    author: (thread, _, { knex }) => {
      return knex("user")
        .select("*")
        .where({ id: thread.user_id })
        .then(R.head)
    },
    rootComments: (thread, _, { knex }) => {
      return knex("comment")
        .select("*")
        .where({
          thread_id: thread.id,
          comment_id: null,
        })
    },
  },
}

const queryResolvers = {
  threads: (_, args, { knex }) => knex("thread").select("*"),
}

module.exports = { type, resolver, queryResolvers }
