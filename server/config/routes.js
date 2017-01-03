const about = require('../db/about/aboutController');
const home = require('../db/home/homeController');
const user = require('../db/users/userController');
const path = require('path');

module.exports = (app, express) => {
  app.get('/api/about', about.getAbout);
  app.get('/api/home', home.getHome);
  app.put('/api/home', home.editHome);

  //Authentication
  app.post('/api/signup', user.signup);
  app.post('/api/signin', user.signin);
  app.put('/api/password', user.changePassword);


  app.get('*', (req, res, next) => res.sendFile(path.resolve('build/index.html')));
};