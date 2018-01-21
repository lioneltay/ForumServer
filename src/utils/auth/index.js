const bcrypt = require("bcrypt")

const hashPassword = password => {
  return new Promise((res, rej) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) rej(err)
      else res(hash)
    })
  })
}

const comparePassword = (password, hash) => {
  return new Promise((res, rej) => {
    bcrypt.compare(password, hash, (err, hash) => {
      if (err) rej(err)
      else res(hash)
    })
  })
}

module.exports = {
  hashPassword,
  comparePassword,
}
