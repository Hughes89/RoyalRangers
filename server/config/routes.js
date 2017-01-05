const about = require('../db/about/aboutController');
const home = require('../db/home/homeController');
const user = require('../db/users/userController');
const auth = require('./auth');
const path = require('path');

module.exports = (app, express) => {
  app.get('/api/about', auth.isAuth, about.getAbout);
  app.get('/api/home', home.getHome);
  app.put('/api/home', auth.isAuth, home.editHome);

  //Authentication
  app.post('/api/signup', auth.isAuth, user.signup);
  app.post('/api/signin', user.signin);
  app.put('/api/password', auth.isAuth, user.changePassword);
  app.get('/api/privelage', auth.isAuth, user.privelageCheck);
  app.get('/api/users', auth.isAuth, user.getAllUsers);
  app.delete('/api/remove/user', auth.isAuth, user.removeUser);


  app.get('*', (req, res, next) => res.sendFile(path.resolve('build/index.html')));
};