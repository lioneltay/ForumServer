const type = `
  type Post {
    id: Int!
    content: String
    author: User
    votes: Int
  }

  extend type Query {
    posts: [Post]
  }

  extend type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }
`

const resolver = {
  Post: {
    author: (post, _, { knex }) =>
      knex
        .raw(`select * from user where id = ?`, [post.user_id])
        .then(result => result[0][0]),
  },
}

const queryResolvers = {
  posts: (_, args, { knex }) =>
    knex.raw(`select * from post`).then(result => result[0]),
}

const mutationResolvers = {
  upvotePost: (_, { postId }) => {
    const post = find(posts, { id: postId })
    if (!post) {
      throw new Error(`Couldn't find post with id ${postId}`)
    }
    post.votes += 1
    return post
  },
}

module.exports = { type, resolver, queryResolvers, mutationResolvers }
