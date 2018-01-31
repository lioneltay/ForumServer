const joinMonster = require("join-monster").default
const R = require("ramda")
const knex = require.main.require("./lib/knex")

const debug = true

const defaultDBCall = sql => knex.raw(sql).then(R.head)

module.exports = (resolveInfo, context, dbCall = defaultDBCall, options) =>
  joinMonster(
    resolveInfo,
    R.merge({ knex }, context),
    sql => {
      if (debug) {
        console.log("\n", sql)
      }
      return dbCall(sql)
    },
    R.merge({ dialect: "mysql" }, options)
  )
