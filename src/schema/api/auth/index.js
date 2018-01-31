const requireGraphql = require.main.require("./lib/require-graphql")

const type = requireGraphql(module, "./type")

const { hashPassword, comparePassword } = require.main.require(
  "./services/auth"
)

const jmAnnotations = {}

const resolver = {
  Query: {
    currentUser: {
      resolve: (parentValue, args, { user }) => {
        return user
      },
    },
  },
  Mutation: {
    signup: {
      resolve: (
        parentValue,
        { firstName, lastName, email, password },
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
                  first_name: firstName,
                  last_name: lastName,
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
      resolve: (parentValue, args, { session, user }) => {
        session.user_id = null
        return user
      },
    },
  },
}

module.exports = { resolver, jmAnnotations, type }
