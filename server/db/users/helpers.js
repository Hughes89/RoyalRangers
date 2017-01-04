const bcrypt = require('bcrypt-nodejs');
const SALT_WORK_FACTOR = 10;

module.exports = {
  hashPassword: (password) => {
    return new Promise((resolve, reject) => {
      let storage = {};
      bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
          return reject(err);
        }
        bcrypt.hash(password, salt, null, (err, hash) => {
          if (err) {
            return reject(err);
          }
          storage.password = hash;
          storage.salt = salt;
          resolve(storage);
        });
      });
    });
  },

  comparePasswords: (submittedPassword, hashedPass) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(submittedPassword, hashedPass, (err, isMatch) => {
        if (err) {
          reject(err);
        } else {
          resolve(isMatch);
        }
      });
    });
  },
};