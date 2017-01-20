const Home = require('./homeModel');

module.exports = {
  editHome: (req, res, next) => {
    console.log(req.body);
    Home.update({_id: '585ae117f36d2873dac6d70c'}, {content: req.body.content, banner: req.body.banner}, {new: true})
      .then(home => res.sendStatus(200))
      .catch(err => {
        if (err) console.log(err);
        res.sendStatus(404);
      });
  },

  getHome: (req, res, next) => {
    Home.findById('585ae117f36d2873dac6d70c')
      .then(home => res.json(home))
      .catch(err => {
        if (err) console.log(err);
        res.sendStatus(404);
      });
  }
};