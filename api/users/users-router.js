
const router = require("express").Router();
const { checkUsernameExists, checkUsernameFree } = require('../auth/auth-middleware');
const { JWT_SECRET } = require("../secrets"); 
const bcrypt = require("bcryptjs")
const User = require('./users-model');
const jwt = require("jsonwebtoken");


// Register a new user
router.post("/register", checkUsernameFree, (req, res, next) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8)
  User.add({ username, password: hash })
    .then(newUser => {
      res.status(201).json({
        user: newUser.user,
        username: newUser.username,
      })
    })
    .catch(next)
});

// Login with an existing user 
router.post("/login", checkUsernameExists, (req, res, next) => {
  if (bcrypt.compareSync(req.body.password, req.users.password)) {
    const token = buildToken(req.users)
    res.json({
      message: `Welcome, ${req.users.username}`,
      token,
    })
  } else {
    next({ 
      status: 401,
      message: "invalid credentials"
    })
  }
});

function buildToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
    password: user.password
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router;
