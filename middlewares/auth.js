const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authenticate = (req, res, next) => {
  const token = req.headers.authorization || ''
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      res.status(401).json({ error: "Your authentication invalid." })
    } else {
      const { expiredAt, email } = decoded
      if (expiredAt > new Date().getTime()) {
        req.email = email;
        next();
      } else {
        res.status(401).json({ msg: "Login Expired!. Please log back into the platform.", data: null })
      }
    }
  })
}

const authError = (err, req, res, next) => {
  res.json(err)
}

module.exports = {
  authenticate,
  authError
}
