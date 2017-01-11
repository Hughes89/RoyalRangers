const about = require('../db/about/aboutController');
const home = require('../db/home/homeController');
const user = require('../db/users/userController');
const events = require('../db/events/eventsController');
const auth = require('./auth');
const path = require('path');

module.exports = (app, express) => {
  app.get('/api/about', auth.isAuth, about.getAbout);
  app.get('/api/home', home.getHome);
  app.put('/api/home', auth.isAuth, home.editHome);

  //Managing Users
  app.post('/api/signup', auth.isAuth, user.signup);
  app.post('/api/signin', user.signin);
  app.put('/api/password', auth.isAuth, user.changePassword);
  app.get('/api/privelage', auth.isAuth, user.privelageCheck);
  app.get('/api/users', auth.isAuth, user.getAllUsers);
  app.delete('/api/remove/user', auth.isAuth, user.removeUser);

  //Managing Events
  app.post('/api/add/event', auth.isAuth, events.addEvent);
  app.get('/api/events', auth.isAuth, events.getEvents);
  app.delete('/api/remove/event', auth.isAuth, events.deleteEvent);


  app.get('*', (req, res, next) => res.sendFile(path.resolve('build/index.html')));
};