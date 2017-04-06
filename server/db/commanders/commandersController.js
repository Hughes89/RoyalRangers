const Commanders = require('./commandersModel.js');

module.exports = {

  addCommander: (req, res, next) => {
    const { name, title, email, about, picture } = req.body;
    Commanders.create({
      name: name,
      title: title,
      email: email,
      about: about,
      picture: picture })
        .then(commander => res.json({id: commander.id}))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
  },

  deleteCommander: (req, res, next) => {
    const id = req.body.id;
    Commanders.findById(id)
      .remove()
      .exec((err, data) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
  },

  editCommander: (req, res, next) => {
    const id = req.body.id;
    Commanders.update({ _id: id}, 
      {name: req.body.name,
      title: req.body.title,
      about: req.body.about,
      picture: req.body.picture,
      email: req.body.email},
      {new: true})
      .then(commander => res.sendStatus(200))
      .catch(err => res.sendStatus(404));
  },

  getCommanders: (req, res, next) => {
    Commanders.find({})
      .then(command => res.json(command))
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      });
  }
  
};