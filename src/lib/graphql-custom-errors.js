const R = require("ramda")

// Takes the properties on the original error and adds them to the returned error object
const formatError = (a, b, c) => {
  R.forEachObjIndexed((val, key) => {
    a[key] = val
  }, a.originalError)

  console.log(a)

  return a
}

module.exports = formatError
