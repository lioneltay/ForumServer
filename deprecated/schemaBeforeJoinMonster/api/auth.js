const GQL = require.main.require("./lib/graphql-types")

const { hashPassword, comparePassword } = require.main.require("./utils/auth")

const queryFields = {
  currentUser: {
    type: GQL("User"),
    resolve: (parentValue, args, { user }) => {
      return user
    },
  },
}

const mutationFields = {
  signup: {
    type: GQL("User"),
    args: {
      name: { type: GQL("String") },
      email: { type: GQL("String") },
      password: { type: GQL("String") },
    },
    resolve: (parentValue, { name, email, password }, { knex, session }) => {
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
  },
  login: {
    type: GQL("User"),
    args: {
      email: { type: GQL("String") },
      password: { type: GQL("String") },
    },
    resolve: (parentValue, { email, password }, { knex, session }) => {
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
  },
  logout: {
    type: GQL("User"),
    resolve: (parentValue, args, { session, user }) => {
      session.user_id = null
      return user
    },
  },
}

module.exports = { queryFields, mutationFields }
