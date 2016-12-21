const Home = require('./homeModel');

module.exports = {
  getHome: (req, res, next) => {
    Home.findById('585ae117f36d2873dac6d70c')
      .then(home => res.json(home))
      .catch(err => res.sendStatus(404));
  },

  editHome: (req, res, next) => {
    const content = req.body.content;
    Home.update({_id: '585ae117f36d2873dac6d70c'}, {content: content}, {new: true})
      .then(home => res.sendStats(200))
      .catch(err => res.sendStatus(404));
  }
};