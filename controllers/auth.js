const userService = require('../services/user')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const login = async (req, res, next) => {
  const {
    email,
    password
  } = req.body
  const usr = await userService.findUserByEmail(email)
  if (!usr) {
    return res.json({
      error: 'User does not exist'
    })
  }
  if (password === usr.password) {
    const token = jwt.sign(
      {
        ...usr.toAuthJSON(),
        expiredAt: new Date().getTime() + 1000 * 60 * 60
      },
      process.env.JWT_SECRET
    )
    return res.json({
      ...usr.toAuthJSON(),
      token: token
    })
  }
  return res.json({
    error: 'Wrong Password'
  })
}

const register = async (req, res, next) => {
  if (await userService.findUserByEmail(req.body.email)) {
    return res.json({
      'error': 'User already exists'
    })
  }
  const usrRes = await userService.addUser(req.body)
  res.json(usrRes)
}

const getMe = (req, res, next) => {
  res.json({
    email: req.email
  })
}

module.exports = {
  login,
  register,
  getMe
}