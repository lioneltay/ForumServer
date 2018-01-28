const joinMonster = require("join-monster").default
const R = require("ramda")
const knex = require("knex")(require.main.require("./knexfile"))

const debug = true

const defaultDBCall = sql => knex.raw(sql).then(R.head)

module.exports = (resolveInfo, context, dbCall = defaultDBCall, options) =>
  joinMonster(
    resolveInfo,
    context,
    sql => {
      if (debug) {
        console.log("\n", sql)
      }
      return dbCall(sql)
    },
    R.merge({ dialect: "mysql" }, options)
  )
