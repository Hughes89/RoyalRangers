const about = require('../db/about/aboutController');
const home = require('../db/home/homeController');
const path = require('path');

module.exports = (app, express) => {
  app.get('/api/about', about.getAbout);
  app.get('/api/home', home.getHome);
  app.put('/api/home', home.editHome);
  app.get('*', (req, res, next) => res.sendFile(path.resolve('public/index.html')));
};