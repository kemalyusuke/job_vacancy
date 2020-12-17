const bcrypt = require('bcryptjs');

function hashing(password) {
  const salt = bcrypt.genSaltSync(5);
  return bcrypt.hashSync(password, salt)
  
}

function validatePassword(plain, hashed) {
  return bcrypt.compareSync(plain, hashed)
}

module.exports = { hashing, validatePassword }