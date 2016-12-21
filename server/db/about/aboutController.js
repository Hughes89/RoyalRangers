const About = require('./aboutModel');

module.exports = {
  getAbout: (req, res, next) => {
    About.findById('585ae0241929b9fe723c88ea')
      .then(about => res.json(about))
      .catch(err => res.sendStatus(404));
  },

  editAbout: (req, res, next) => {
    const content = req.body.content;
    About.update({_id: '585ae0241929b9fe723c88ea'}, {content: content}, {new: true})
      .then((home) => res.sendStatus(200))
      .catch(err => res.sendStatus(404));
  }
};