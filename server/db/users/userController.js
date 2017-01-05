const User = require('./userModel');
const jwt = require('jwt-simple');
const helper = require('./helpers');
require('dotenv').config();
const secret = process.env.secret;

module.exports = {
  signup: (req, res, next) => {
    const email = req.body.email.toLowerCase();
    const password = helper.hashPassword(req.body.password)
      .then(data => {
        User.findOne({ email: email })
          .then((user) => {
            if (user) {
              return res.sendStatus(400);
            }
            User.create({
              email: email,
              password: data.password,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              salt: data.salt,
              privelage: req.body.privelage
            })
              .then((user) => {
                  user.password = '';
                  user.salt = '';
                  res.json({ user: user });
              });
          });
      });
  },

  signin: (req, res, next) => {
    const email = req.body.email.toLowerCase();
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return res.sendStatus(404);
        }
        helper.comparePasswords(req.body.password, user.password)
          .then(function (foundUser) {
            if (!foundUser) {
              return res.sendStatus(401);
            }
            user.password = '';
            user.salt = '';
            const token = jwt.encode(user, process.env.secret);
            res.json({ token: token });
          });
      });
  },

  changePassword: (req, res, next) => {
    const username = req.user.email;
    User.findOne({ email: email })
      .then((user) => {
        helper.comparePasswords(req.body.password, user.password)
          .then((match) => {
            if (!match) {
              return res.sendStatus(401);
            }
            helper.hashPassword(req.body.newPassword)
              .then((temp) => {
                User.findOneAndUpdate({ email: email }, temp, { new: true })
                  .then((user) => {
                    res.sendStatus(200);
                  });
              });
          });
      });
  },

  privelageCheck: (req, res, next) => {
    res.json({privelage: req.user.privelage});
  },

  getAllUsers: (req, res, next) => {
    User.find({})
      .then((users) => {
        users.forEach(user => {
          user.password = undefined;
          user.salt = undefined;
        });
        console.log(users);
        res.json(users);
      });
  },

  removeUser: (req, res, next) => {
    console.log(req.body);
    if (req.user.privelage === 'user') {
      return res.sendStatus(401);
    }
    const id = req.body.id;
    User.find({ _id: id })
      .remove()
      .exec((err, data) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
  }
};