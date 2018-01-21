const { hashPassword, comparePassword } = require("../../utils/auth")

const type = `
  extend type Mutation {
    signup(name: String, email: String, password: String): User
    login(email: String, password: String): User
    logout: User
  }

  extend type Query {
    currentUser: User
  }
`

const resolver = {}

const queryResolvers = {
  currentUser: (parentValue, args, { user }) => {
    return user
  },
}

const mutationResolvers = {
  signup: (parentValue, { name, email, password }, { knex, session }) => {
    return hashPassword(password).then(hashedPassword =>
      knex("user")
        .insert({
          name,
          email,
          password: hashedPassword,
        })
        .then(([user_id]) => {
          return knex("user")
            .select("*")
            .where({ id: user_id })
            .then(res => {
              const user = res[0]
              session.user_id = user.id
              return user
            })
        })
    )
  },
  login: (parentValue, { email, password }, { knex, session }) => {
    return knex("user")
      .select("*")
      .where({ email })
      .then(([user]) => {
        return !user
          ? null
          : comparePassword(password, user.password).then(valid => {
              if (valid) {
                session.user_id = user.id
                return user
              } else {
                return null
              }
            })
      })
  },
  logout: (parentValue, args, { session, user }) => {
    session.user_id = null
    return user
  },
}

module.exports = { type, resolver, queryResolvers, mutationResolvers }
