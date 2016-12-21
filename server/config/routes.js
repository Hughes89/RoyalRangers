const about = require('../db/about/aboutController');
const home = require('../db/home/homeController');

module.exports = (app, express) => {
  app.get('/api/about', about.getAbout);
  app.get('/api/home', home.getHome);
  app.put('/api/home', home.editHome);
};