var jwt = require('jwt-simple');

module.exports = {
  isAuth: (req, res, next) => {
    let token = req.headers['authorization'];
    console.log(typeof token);
    if (!token) {
      return res.sendStatus(401);
    }
    try {
      token = token.replace('Bearer ', '');
      if (token === 'false') {
        return res.sendStatus(401);
      }
      const user = jwt.decode(token, process.env.secret);
      req.user = user;
      next();
    } catch (error) {
      return sendStatus(401);
    }
  }
};