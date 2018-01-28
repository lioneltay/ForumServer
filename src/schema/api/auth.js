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
      first_name: { type: GQL("NonNull")(GQL("String")) },
      last_name: { type: GQL("NonNull")(GQL("String")) },
      email: { type: GQL("NonNull")(GQL("String")) },
      password: { type: GQL("NonNull")(GQL("String")) },
    },
    resolve: (
      parentValue,
      { first_name, last_name, email, password },
      { knex, session }
    ) => {
      return knex("user")
        .select("*")
        .where({ email })
        .then(([user]) => {
          if (user) {
            const error = Error("signup error")
            error.args = {
              email: "Email already in use",
            }
            throw error
          }
          return hashPassword(password).then(hashedPassword =>
            knex("user")
              .insert({
                first_name,
                last_name,
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
        })
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
          if (!user) {
            const error = Error("Login Fail")
            error.args = {
              email: "Invalid Email",
            }
            throw error
          }

          return comparePassword(password, user.password).then(valid => {
            if (valid) {
              session.user_id = user.id
              return user
            } else {
              const error = Error("Login Fail")
              error.args = {
                password: "Incorrect Password",
              }
              throw error
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
