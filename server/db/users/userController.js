const User = require('./userModel');
const jwt = require('jwt-simple');
const helper = require('./helpers');
require('dotenv').config();
const secret = process.env.secret;

module.exports = {
  signup: (req, res, next) => {
    const username = req.body.username.toLowerCase();
    User.findOne({ username: username })
      .then((user) => {
        if (user) {
          return res.sendStatus(400);
        }
        User.create({
          username: username,
          password: req.body.password,
          privelage: req.body.privelage })
          .then((user) => {
              const token = jwt.encode(user, process.env.secret);
              res.json({ token: token });
          });
      });
  },

  signin: (req, res, next) => {
    const username = req.body.username.toLowerCase();
    User.findOne({ username: username })
      .then((user) => {
        if (!user) {
          return res.sendStatus(404);
        }
        helper.comparePasswords(req.body.password, user.password)
          .then(function (foundUser) {
            if (!foundUser) {
              return res.sendStatus(401);
            }
            const token = jwt.encode(user, process.env.secret);
            res.json({token: token});
          });
      });
  },

  changePassword: (req, res, next) => {
    //Grab username from token
    const username = req.body.username.toLowerCase();
    User.findOne({ username: username })
      .then((user) => {
        helper.comparePasswords(req.body.password, user.password)
          .then((match) => {
            if (!match) {
              return res.sendStatus(401);
            }
            helper.hashPassword(req.body.newPassword)
              .then((temp) => {
                User.findOneAndUpdate({ username: username }, temp, { new: true })
                  .then((user) => {
                    res.sendStatus(200);
                  });
              });
          });
      });
  }
};