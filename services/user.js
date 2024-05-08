const User = require('../models/user')

const findUserByEmail = async email => {
  let usr = await User.findOne({ email: email })
  return usr;
}

const addUser = async user => {
  let usr = new User(user)
  const userRes = await usr.save()
  return userRes
}

module.exports = {
  addUser,
  findUserByEmail
}