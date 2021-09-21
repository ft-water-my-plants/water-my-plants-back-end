// const router = require("express").Router();
// const { checkUsernameExists, checkUsernameFree } = require('./auth-middleware');
// const { JWT_SECRET } = require("../secrets"); 
// const bcrypt = require("bcryptjs")
// const User = require('../users/users-model');
// const jwt = require("jsonwebtoken");


// router.post("/register", checkUernameFree, (req, res, next) => {
//   const { username, password } = req.body
//   const hash = bcrypt.hashSync(password, 8)
//   User.add({ username, password: hash })
//     .then(newUser => {
//       res.status(201).json({
//         user: newUser.user,
//         username: newUser.username,
//       })
//     })
//     .catch(next)
// });


// router.post("/login", checkUsernameExists, (req, res, next) => {
//   if (bcrypt.compareSync(req.body.password, req.users.password)) {
//     const token = buildToken(req.users)
//     res.json({
//       message: `welcome, ${req.users.username}`,
//       token,
//     })
//   } else if (!req.body.username || !req.body.password) {
//     next({
//       status: 401,
//       message: "please enter a username and password",
//     })
//   } else {
//     next({ 
//       status: 401,
//       message: "invalid credentials"
//     })
//   }
// });

// function buildToken(user) {
//   const payload = {
//     subject: user.user_id,
//     username: user.username,
//     password: user.password
//   }
//   const options = {
//     expiresIn: '1d',
//   }
//   return jwt.sign(payload, JWT_SECRET, options)
// }

// module.exports = router;