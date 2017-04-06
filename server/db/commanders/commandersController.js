const Commanders = require('./commandersModel.js');

module.exports = {

  addCommander: (req, res, next) => {
    const { name, title, email, about, picture } = req.body;
    Commanders.create({ name, title, email, about, picture })
        .then(commander => res.json({id: commander.id}))
        .catch(err => res.sendStatus(400));
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
    const { _id, name, title, email , picture, about } = req.body;
    Commanders.update({ _id: _id}, { name, title, about, picture, email }, {new: true})
      .then(commander => res.sendStatus(200))
      .catch(err => res.sendStatus(404));
  },

  getCommanders: (req, res, next) => {
    Commanders.find({})
      .then(command => res.json(command))
      .catch(err => res.sendStatus(404));
  }
  
};