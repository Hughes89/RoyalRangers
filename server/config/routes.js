const home = require('../db/home/homeController');
const user = require('../db/users/userController');
const events = require('../db/events/eventsController');
const pictures = require('../db/pictures/picturesController');
const auth = require('./auth');
const path = require('path');

module.exports = (app, express) => {

  //Home content Routes
  app.get('/api/home', home.getHome);
  app.put('/api/home', auth.isAuth, home.editHome);

  //User Routes
  app.post('/api/signup', auth.isAuth, user.signup);
  app.post('/api/signin', user.signin);
  app.put('/api/password', auth.isAuth, user.changePassword);
  app.get('/api/privelage', auth.isAuth, user.privelageCheck);
  app.get('/api/users', auth.isAuth, auth.isAdmin, user.getAllUsers);
  app.delete('/api/remove/user', auth.isAuth, auth.isAdmin, user.removeUser);
  app.put('/api/activate/user', auth.isAuth, auth.isAdmin, user.addPendingUser);

  //Events Routes
  app.post('/api/add/event', auth.isAuth, auth.isAdmin, events.addEvent);
  app.get('/api/events', auth.isAuth, events.getEvents);
  app.delete('/api/remove/event', auth.isAuth, auth.isAdmin, events.deleteEvent);
  app.put('/api/update/event', auth.isAuth, auth.isAdmin, events.editEvent);

  //Picture Routes
  app.get('/api/pictures', auth.isAuth, pictures.getAlbums);
  app.delete('/api/pictures', auth.isAuth, auth.isAdmin, pictures.deleteAlbum);
  app.post('/api/pictures', auth.isAuth, auth.isAdmin, pictures.addAlbum);
  app.put('/api/pictures', auth.isAuth, auth.isAdmin, pictures.editAlbum);


  app.get('*', (req, res, next) => res.sendFile(path.resolve('./public/index.html')));
};