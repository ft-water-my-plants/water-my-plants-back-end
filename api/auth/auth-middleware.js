const { JWT_SECRET } = require("../secrets"); // use this secret!
const jwt = require('jsonwebtoken')
const { findById, findBy } = require("../users/users-model");

const restricted = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return next({
      status: 401,
      message: 'Token required'
    })
  }
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      next({
        status: 401,
        message: 'Token invalid'
      })
    } else {
      req.decodedToken = decodedToken
      next()
    }
  })
}

const checkUsernameExists = async (req, res, next) => {
  try {
    const [ user ] = await findBy({ username: req.body.username })
    if(!user) {
      next({
        status: 422,
        message: "Invalid credentials"
      })
    } else {
      req.users = user
      next()
    }
  } catch (err) {
    next(err)
  }
};

async function checkUsernameFree(req, res, next) {
  try {
    const users = await findBy({ username: req.body.username })
    if (!users.length) {
      next()
    }
    else {
      next({ message: "Username taken", status: 422  })
    } 
  } catch (err) {
    next(err)
  }
}

module.exports = {
  restricted,
  checkUsernameExists,
  checkUsernameFree,
}